import {
  AfterViewInit,
  Component,
  ElementRef,
  NgZone,
  OnDestroy,
  ViewChild,
  inject,
} from '@angular/core';

interface Glyph {
  x: number;
  top: number;
  bottom: number;
}
interface BuildJob {
  target: HTMLElement;
  mode: 'type' | 'assemble';
  worker: number;
  start: number;
  duration: number;
  glyphs: Glyph[];
  clip: string;
  willChange: string;
  started: boolean;
}
interface Worker {
  cursor: HTMLElement;
  selection: HTMLElement;
  caret: HTMLElement;
  x: number;
  y: number;
  originX: number;
  originY: number;
  availableAt: number;
  activeTarget?: HTMLElement;
}

@Component({
  selector: 'app-live-build',
  templateUrl: './live-build.component.html',
  styleUrl: './live-build.component.css',
})
export class LiveBuildComponent implements AfterViewInit, OnDestroy {
  @ViewChild('overlay') overlayRef!: ElementRef<HTMLElement>;
  private readonly zone = inject(NgZone);
  private observer?: IntersectionObserver;
  private mutations?: MutationObserver;
  private workers: Worker[] = [];
  private jobs: BuildJob[] = [];
  private played = new WeakSet<HTMLElement>();
  private modes = new Map<HTMLElement, 'type' | 'assemble'>();
  private frame = 0;
  private destroyed = false;
  private readonly motionPreference = window.matchMedia(
    '(prefers-reduced-motion: reduce)',
  );
  reducedMotion = this.motionPreference.matches;
  paused = false;
  private readonly targets = [
    '.hero-copy h1',
    '.hero-role',
    '.hero-description',
    '.section-heading h2',
    '.about-copy h2',
    '.about-copy > p:not(.eyebrow)',
    '.skill-row h4',
    '.skill-row p',
    '.process-step h4',
    '.process-step p',
    '.timeline h3',
    '.timeline p',
    '.journey-aside > h3',
    '.contact-intro h2',
    '.contact-intro > p:not(.eyebrow)',
    '.contact-links > a > span',
    '.closing-line > span',
  ].join(',');
  private readonly frames =
    '.project-art, .about-preview, .manifesto, .contact-card';

  ngAfterViewInit(): void {
    void document.fonts.ready.then(() => {
      if (this.destroyed) return;
      this.zone.runOutsideAngular(() => {
        this.createWorkers();
        this.watchTargets();
        window.addEventListener('resize', this.onResize);
        document.addEventListener('visibilitychange', this.onVisibility);
        this.motionPreference.addEventListener('change', this.onMotionChange);
      });
    });
  }

  private createWorkers(): void {
    const roles = [
      { label: 'Designer', color: '#70b4ff' },
      { label: 'Developer', color: '#78ecc0' },
      { label: 'Writer', color: '#c6a2ff' },
    ];
    const count = window.innerWidth < 600 ? 2 : 3;
    this.workers = roles.slice(0, count).map((role, index) => {
      const cursor = document.createElement('div');
      cursor.className = 'build-cursor';
      cursor.style.setProperty('--worker-color', role.color);
      cursor.innerHTML =
        '<svg width="20" height="25" viewBox="0 0 20 25" fill="none"><path d="M2 2L18 15L10 16L6 23L2 2Z" fill="currentColor" stroke="#0c0c12" stroke-width="1.4" stroke-linejoin="round"/></svg>';
      const label = document.createElement('span');
      label.textContent = role.label;
      cursor.append(label);
      const selection = document.createElement('div');
      selection.className = 'build-selection';
      selection.style.setProperty('--worker-color', role.color);
      for (let i = 0; i < 4; i++) selection.append(document.createElement('b'));
      const caret = document.createElement('div');
      caret.className = 'build-caret';
      caret.style.background = role.color;
      this.overlayRef.nativeElement.append(selection, caret, cursor);
      return {
        cursor,
        selection,
        caret,
        x: 70 + index * 120,
        y: 160,
        originX: 0,
        originY: 0,
        availableAt: 0,
      };
    });
  }

  private watchTargets(): void {
    this.observer = new IntersectionObserver(
      (entries) => {
        if (this.paused || this.reducedMotion || document.hidden) return;
        for (const entry of entries) {
          const target = entry.target as HTMLElement;
          if (entry.isIntersecting && !this.played.has(target))
            this.schedule(target);
        }
      },
      { rootMargin: '-10% 0px -8% 0px', threshold: 0.3 },
    );
    this.refreshTargets();
    const main = document.getElementById('main');
    if (main) {
      this.mutations = new MutationObserver(() => this.refreshTargets());
      this.mutations.observe(main, { childList: true, subtree: true });
    }
  }

  private refreshTargets(): void {
    for (const target of this.modes.keys()) {
      if (!target.isConnected) {
        this.observer?.unobserve(target);
        this.modes.delete(target);
      }
    }
    const main = document.getElementById('main');
    for (const [selector, mode] of [
      [this.targets, 'type'],
      [this.frames, 'assemble'],
    ] as const) {
      main?.querySelectorAll<HTMLElement>(selector).forEach((target) => {
        if (this.modes.has(target)) return;
        this.modes.set(target, mode);
        this.observer?.observe(target);
      });
    }
  }

  private schedule(target: HTMLElement): void {
    // Never mask content while the visitor is focused on it or using a dialog.
    if (
      this.paused ||
      this.reducedMotion ||
      !this.workers.length ||
      document.querySelector('[role="dialog"]') ||
      this.isFocused(target)
    )
      return;
    const now = performance.now();
    let lane = 0;
    this.workers.forEach((worker, i) => {
      if (worker.availableAt < this.workers[lane].availableAt) lane = i;
    });
    const mode = this.modes.get(target) ?? 'type';
    const duration =
      mode === 'assemble'
        ? 1500
        : Math.min(
            2000,
            Math.max(850, (target.textContent?.trim().length ?? 0) * 19),
          );
    const start = Math.max(
      now + 300 + lane * 90,
      this.workers[lane].availableAt + 100,
    );
    this.workers[lane].availableAt = start + duration + 950;
    this.played.add(target);
    this.jobs.push({
      target,
      mode,
      worker: lane,
      start,
      duration,
      glyphs: [],
      clip: target.style.clipPath,
      willChange: target.style.willChange,
      started: false,
    });
    this.ensureFrame();
  }

  private ensureFrame(): void {
    if (
      !this.frame &&
      !this.paused &&
      !this.reducedMotion &&
      !this.destroyed &&
      !document.hidden
    )
      this.frame = requestAnimationFrame(this.tick);
  }

  private glyphPositions(target: HTMLElement): Glyph[] {
    const bounds = target.getBoundingClientRect();
    const glyphs: Glyph[] = [];
    const walker = document.createTreeWalker(target, NodeFilter.SHOW_TEXT);
    let node: Node | null;
    while ((node = walker.nextNode())) {
      const text = node.textContent ?? '';
      for (let i = 0; i < text.length; i++) {
        if (!text[i].trim()) continue;
        const range = document.createRange();
        range.setStart(node, i);
        range.setEnd(node, i + 1);
        const rect = range.getBoundingClientRect();
        if (!rect.width || !rect.height) continue;
        glyphs.push({
          x: Math.min(bounds.width, rect.right - bounds.left + 2),
          top: Math.max(0, rect.top - bounds.top - 3),
          bottom: Math.min(bounds.height, rect.bottom - bounds.top + 3),
        });
      }
    }
    return glyphs;
  }

  private readonly tick = (now: number): void => {
    this.frame = 0;
    const remaining: BuildJob[] = [];
    let cancelled = false;
    for (const job of this.jobs) {
      const worker = this.workers[job.worker];
      const rect = job.target.getBoundingClientRect();
      const elapsed = now - job.start;
      const offscreen = rect.bottom < 90 || rect.top > window.innerHeight - 20;
      if (
        !job.target.isConnected ||
        offscreen ||
        document.querySelector('[role="dialog"]') ||
        this.isFocused(job.target)
      ) {
        this.finish(job);
        cancelled = true;
        if (!job.started) this.played.delete(job.target);
        continue;
      }
      if (elapsed < 0) {
        remaining.push(job);
        continue;
      }
      if (!job.started) {
        job.started = true;
        worker.activeTarget = job.target;
        job.glyphs = job.mode === 'type' ? this.glyphPositions(job.target) : [];
        worker.originX = Math.max(
          20,
          Math.min(window.innerWidth - 90, worker.x),
        );
        worker.originY = Math.max(
          110,
          Math.min(window.innerHeight - 55, worker.y),
        );
        job.target.style.willChange = 'clip-path';
        worker.selection.dataset['mode'] = job.mode;
      }
      if (elapsed > job.duration + 850) {
        this.finish(job);
        continue;
      }
      const progress = Math.min(1, Math.max(0, (elapsed - 600) / job.duration));
      const approach = 1 - Math.pow(1 - Math.min(1, elapsed / 400), 3);
      let x = rect.left + Math.min(rect.width - 5, 18);
      let y = rect.top + Math.min(rect.height, 24);
      const writing = elapsed >= 600 && progress < 1;
      if (job.mode === 'type' && job.glyphs.length && elapsed >= 600) {
        const glyph =
          job.glyphs[
            Math.min(
              job.glyphs.length - 1,
              Math.floor(progress * job.glyphs.length),
            )
          ];
        x = rect.left + glyph.x;
        y = rect.top + glyph.bottom;
        // Reveal completed lines and the current character without changing Angular's text nodes.
        job.target.style.clipPath =
          progress >= 1
            ? job.clip
            : `polygon(0 0,100% 0,100% ${glyph.top}px,${glyph.x}px ${glyph.top}px,${glyph.x}px ${glyph.bottom}px,0 ${glyph.bottom}px)`;
        worker.caret.style.height = `${Math.min(glyph.bottom - glyph.top, 70)}px`;
        worker.caret.style.transform = `translate3d(${x + 2}px,${rect.top + glyph.top}px,0)`;
      } else if (job.mode === 'assemble' && elapsed >= 600) {
        job.target.style.clipPath =
          progress >= 1 ? job.clip : `inset(0 0 ${(1 - progress) * 100}% 0)`;
        x = rect.right - 6;
        y = rect.top + rect.height * progress;
      }
      worker.x =
        worker.originX +
        (Math.min(window.innerWidth - 90, x + 8) - worker.originX) * approach;
      worker.y =
        worker.originY +
        (Math.max(100, Math.min(window.innerHeight - 48, y + 5)) -
          worker.originY) *
          approach;
      worker.cursor.style.transform = `translate3d(${worker.x}px,${worker.y}px,0)`;
      const opacity =
        elapsed > job.duration + 600
          ? Math.max(0, 1 - (elapsed - job.duration - 600) / 250)
          : Math.min(1, elapsed / 150);
      worker.cursor.style.opacity = String(opacity);
      worker.selection.style.transform = `translate3d(${rect.left - 5}px,${rect.top - 4}px,0)`;
      worker.selection.style.width = `${rect.width + 10}px`;
      worker.selection.style.height = `${rect.height + 8}px`;
      worker.selection.style.opacity = String(approach > 0.95 ? opacity : 0);
      worker.selection.classList.toggle('is-typing', writing);
      worker.caret.style.opacity = writing && job.mode === 'type' ? '1' : '0';
      remaining.push(job);
    }
    this.jobs = remaining;
    this.workers.forEach((worker, index) => {
      let availableAt = 0;
      for (const job of remaining.filter((job) => job.worker === index)) {
        if (cancelled && !job.started)
          job.start = Math.max(now + 180, availableAt + 100);
        availableAt = job.start + job.duration + 950;
      }
      worker.availableAt = availableAt;
    });
    if (this.jobs.length) this.ensureFrame();
  };

  private isFocused(target: HTMLElement): boolean {
    return (
      target.contains(document.activeElement) ||
      target.closest('button, a') === document.activeElement
    );
  }
  private finish(job: BuildJob): void {
    job.target.style.clipPath = job.clip;
    job.target.style.willChange = job.willChange;
    const worker = this.workers[job.worker];
    if (worker.activeTarget === job.target) {
      worker.cursor.style.opacity = '0';
      worker.selection.style.opacity = '0';
      worker.caret.style.opacity = '0';
      worker.activeTarget = undefined;
    }
  }
  private finishAll(): void {
    cancelAnimationFrame(this.frame);
    this.frame = 0;
    this.jobs.forEach((job) => this.finish(job));
    this.jobs = [];
    this.workers.forEach((worker) => (worker.availableAt = 0));
  }
  toggle(): void {
    this.paused = !this.paused;
    this.finishAll();
    if (!this.paused) this.replay();
  }
  replay(): void {
    if (this.reducedMotion) return;
    this.paused = false;
    this.finishAll();
    // Replay the current view now, and replay the remaining sections as they enter.
    this.played = new WeakSet();
    this.zone.runOutsideAngular(() => {
      for (const target of this.modes.keys()) {
        const rect = target.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.85 && rect.bottom > 110)
          this.schedule(target);
      }
    });
  }
  private readonly onResize = (): void => {
    this.finishAll();
  };
  private readonly onVisibility = (): void => {
    if (document.hidden) this.finishAll();
  };
  private readonly onMotionChange = (event: MediaQueryListEvent): void => {
    this.zone.run(() => {
      this.reducedMotion = event.matches;
    });
    this.finishAll();
    if (!event.matches) this.replay();
  };
  ngOnDestroy(): void {
    this.destroyed = true;
    this.observer?.disconnect();
    this.mutations?.disconnect();
    this.finishAll();
    window.removeEventListener('resize', this.onResize);
    document.removeEventListener('visibilitychange', this.onVisibility);
    this.motionPreference.removeEventListener('change', this.onMotionChange);
  }
}
