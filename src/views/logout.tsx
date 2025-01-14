import React from 'react';
import { useNavigate } from 'react-router-dom';
import { pizzaService } from '../service/service';
import View from './view';
import { User } from '../service/pizzaService';

interface Props {
  setUser: (user: User | null) => void;
}

export default function Logout(props: Props) {
  const navigate = useNavigate();

  React.useEffect(() => {
    (async () => {
      await pizzaService.logout();
      props.setUser(null);
      navigate('/');
    })();
  }, []);

  return (
    <View title="Logout">
      <div className="text-neutral-100">Logging out ...</div>
    </View>
  );
}
