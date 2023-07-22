import { Access, useAccess } from '@umijs/max';
import NoFoundPage from '../404';

function Dentist() {
  const access = useAccess();
  return (
    <Access accessible={access.dentistRoute()} fallback={<NoFoundPage />}>
      <main>Dentist</main>
    </Access>
  );
}

export default Dentist;
