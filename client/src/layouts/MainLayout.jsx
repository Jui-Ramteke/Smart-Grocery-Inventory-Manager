import Sidebar from "../components/common/Sidebar";
import Header from "../components/common/Header";

const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100 flex">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Header />

        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;