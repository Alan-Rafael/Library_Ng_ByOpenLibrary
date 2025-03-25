import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '', 
    renderMode: RenderMode.Client,
  },
  {
    path: 'viewBook/:id', 
    renderMode: RenderMode.Prerender,
    // getPrerenderParams: async () => {
    //   return [
    //     { id: '123' }, 
    //     { id: '456' },
    //     { id: '789' }
    //   ];
    // },
  },
  {
    path: '**', // Todas as outras rotas são renderizadas no servidor (SSR)
    renderMode: RenderMode.Server,
  },
];
