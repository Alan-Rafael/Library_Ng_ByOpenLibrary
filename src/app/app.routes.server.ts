import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '', 
    renderMode: RenderMode.Client,
  },
  {
    path: 'viewBook/:id', 
    renderMode: RenderMode.Prerender,
  },
  {
    path: '**', 
    renderMode: RenderMode.Server,
  },
];
