import { useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Layout } from './Layout';
import { routes } from './routes';
import { usePerformanceStore } from '@/store/performanceStore';

const router = createBrowserRouter([
  { element: <Layout />, children: routes },
]);

export function App() {
  const init = usePerformanceStore((s) => s.init);

  // Performance tier is computed once, before CpuScene/TeamGraph mount,
  // since both read it to decide trace count / branch depth / whether to
  // run the force simulation at all.
  useEffect(() => {
    init();
  }, [init]);

  return <RouterProvider router={router} />;
}
