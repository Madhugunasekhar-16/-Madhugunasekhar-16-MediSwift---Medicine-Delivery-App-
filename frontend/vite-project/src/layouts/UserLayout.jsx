import Navbar from "../components/Navbar";

const UserLayout = ({ children }) => {
  return (
    <div>

      
      <Navbar />

      
      <div className="p-4">
        {children}
      </div>

    </div>
  );
};

export default UserLayout;