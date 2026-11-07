import {
  AfterViewInit,
  Component,
  NgZone,
  OnDestroy,
  inject,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LiveBuildComponent } from '../../component/live-build/live-build.component';

interface Work {
  id: string;
  title: string;
  category: string;
  image: string;
  description: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  imports: [LiveBuildComponent],
})
export class HomeComponent implements AfterViewInit, OnDestroy {
  private readonly zone = inject(NgZone);
  private readonly route = inject(ActivatedRoute);
  private observer?: IntersectionObserver;
  private sectionObserver?: IntersectionObserver;
  menuOpen = false;
  activeSection = 'home';
  activeFilter = 'All';
  selectedWork: Work | null = null;
  readonly filters = ['All', 'Web development', 'Design', 'Articles'];
  readonly works: Work[] = [
    {
      id: '01',
      title: 'The portfolio experience',
      category: 'Web development',
      image: '',
      description:
        'The Angular portfolio you are exploring. A responsive, interactive experience with bold typography, project filtering, and a live-building animation with simulated collaborator cursors. Built with Angular, TypeScript, and CSS.',
    },
    {
      id: '02',
      title: 'Technology, visualised',
      category: 'Design',
      image: 'Artical02.png',
      description:
        'A visual exploration of Java arrays and string searching. Turning a technical topic into a clear, engaging visual story.',
    },
    {
      id: '03',
      title: 'The next chapter of AI',
      category: 'Articles',
      image: 'Artical01.png',
      description:
        'An article visual exploring artificial intelligence and the changing Sri Lankan job market. Part of my collection of technology-focused content.',
    },
  ];
  get filteredWorks(): Work[] {
    return this.activeFilter === 'All'
      ? this.works
      : this.works.filter((work) => work.category === this.activeFilter);
  }
  setFilter(filter: string): void {
    this.activeFilter = filter;
  }
  navigate(): void {
    this.menuOpen = false;
  }
  openWork(work: Work): void {
    this.selectedWork = work;
    document.body.style.overflow = 'hidden';
  }
  closeWork(): void {
    this.selectedWork = null;
    document.body.style.overflow = '';
    requestAnimationFrame(() =>
      document.getElementById('work-' + this.lastWorkId)?.focus(),
    );
  }
  lastWorkId = '';

  ngAfterViewInit(): void {
    this.observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        }
      },
      { threshold: 0.12 },
    );
    document
      .querySelectorAll('.reveal')
      .forEach((el) => this.observer?.observe(el));
    this.sectionObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting)
            this.zone.run(() => (this.activeSection = entry.target.id));
        }
      },
      { rootMargin: '-15% 0px -60% 0px', threshold: 0 },
    );
    document
      .querySelectorAll('main > section[id]')
      .forEach((el) => this.sectionObserver?.observe(el));
    const section = this.route.snapshot.data['section'] as string | undefined;
    if (section)
      requestAnimationFrame(() =>
        document
          .getElementById(section)
          ?.scrollIntoView({ behavior: 'instant' }),
      );
    window.addEventListener('keydown', this.keydown);
  }

  private readonly keydown = (event: KeyboardEvent): void => {
    if (event.key === 'Escape') {
      if (this.selectedWork) this.closeWork();
      this.menuOpen = false;
    }
    if (event.key === 'Tab' && this.selectedWork) {
      const elements = Array.from(
        document.querySelectorAll<HTMLElement>(
          '.work-dialog button, .work-dialog a',
        ),
      );
      const first = elements[0],
        last = elements[elements.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    }
  };
  focusDialog(): void {
    setTimeout(() => document.getElementById('close-work')?.focus());
  }
  ngOnDestroy(): void {
    this.observer?.disconnect();
    this.sectionObserver?.disconnect();
    window.removeEventListener('keydown', this.keydown);
    document.body.style.overflow = '';
  }
}
