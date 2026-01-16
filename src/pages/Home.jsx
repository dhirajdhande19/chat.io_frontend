import Header from '../component/Header';
import Content from '../component/content';
import Footer from '../component/Footer';
export default function Home() {
  return (
    <div className="min-h-screen grid grid-rows-[auto_1fr_auto]">
      <Header />
      <Content />
      {/* <SignUpPage/> */}
      <Footer />
    </div>
  );
}
