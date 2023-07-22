import { Access, useAccess } from '@umijs/max';
import NoFoundPage from '../404';

function Staff() {
  const access = useAccess();
  return (
    <Access accessible={access.staffRoute()} fallback={<NoFoundPage />}>
      <main>Staff</main>
    </Access>
  );
}

export default Staff;
