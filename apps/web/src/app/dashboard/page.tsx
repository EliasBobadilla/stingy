import UserTable from '@/components/UserTable';

const Page = async () => {
 

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center space-y-4 p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-gray-800">This is the dashboard page</h1>
        <div>
   
          <UserTable/>
        </div>
      </div>
    </div>
  );
};

export default Page;





