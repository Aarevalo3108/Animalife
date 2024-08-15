


const ResetPassword = () => {
  return (
    <div className="bg-[url('/Animalife.jpeg')] bg-cover bg-center min-h-[85vh]">
      <div className="bg-[rgba(0,0,0,0.6)] min-h-[85vh] p-8 flex flex-col items-center justify-center">
        <div className="flex bg-[#fcf8f0] rounded-xl">
          <div className="p-4 flex flex-col items-center justify-center gap-4">
            <h1 className="text-3xl font-bold">Reset Password</h1>
            <div className="py-8 flex flex-col gap-4">
              <form className="flex flex-col gap-4">
                <label>
                  Enter email address:
                  <input className="p-2 rounded-xl w-full" type="email" placeholder="Enter your email" />
                </label>
                <p className="w-64 text-[#0009] text-sm text-justify">Enter your email address and we&apos;ll send you a link to reset your password</p>
                <div className="flex w-full justify-center">
                  <button type="submit" className="w-48 bg-[#433526] text-[#f2e0c2] p-2 rounded-xl hover:bg-[#f2e0c2] hover:text-[#433526] transition duration-150">Reset Password</button>
                </div>
                <p>Don&apos;t have an account? <a href="./singup" className="text-[#708c5a] border-b border-[#fcf8f0] hover:border-[#000] transition duration-150">Sign Up</a></p>
              </form>
            </div>
          </div>
          <img className="w-[450px] rounded-xl hidden lg:flex" src="/Animalife.jpeg" alt="" />
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;