import { Button } from 'react-bootstrap';
import Link from 'next/link';
import Head from 'next/head';
import { useAuth } from '../utils/context/authContext';

function Home() {
  const { user } = useAuth();

  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center"
      style={{
        height: '90vh',
        padding: '30px',
        maxWidth: '400px',
        margin: '0 auto',
      }}
    >
      <Head>
        <title>Home Page</title>
      </Head>
      <h1>Hello {user.displayName}! </h1>
      <Link href="/teams" passHref>
        <Button variant="warning" type="button" size="lg" className="copy-btn">
          View Teams
        </Button>
      </Link>
      <Link href="/team/new" passHref>
        <Button variant="warning" type="button" size="lg" className="copy-btn">
          Add a Team
        </Button>
      </Link>
      <Link href="/members" passHref>
        <Button variant="warning" type="button" size="lg" className="copy-btn">
          View Members
        </Button>
      </Link>
      <Link href="/member/new" passHref>
        <Button variant="warning" type="button" size="lg" className="copy-btn">
          Add a Member
        </Button>
      </Link>
    </div>
  );
}

export default Home;
