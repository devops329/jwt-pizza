import { useLocation, useNavigate } from 'react-router-dom';

function useBreadcrumb(sibling?: string) {
  const location = useLocation();
  const navigate = useNavigate();

  const navigateByBreadcrumb = () => {
    let newPath = location.pathname.substring(0, location.pathname.lastIndexOf('/'));
    if (sibling) {
      newPath = newPath + '/' + sibling;
    } else if (newPath === '') {
      newPath = '/';
    }
    navigate(newPath, { state: location.state });
  };

  return navigateByBreadcrumb;
}

export { useBreadcrumb };
