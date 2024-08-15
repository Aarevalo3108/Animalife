const Login = () => {
  return (
    <div className="bg-[url('/Animalife.jpeg')] bg-cover bg-center min-h-[85vh]">
      <div className="bg-[rgba(0,0,0,0.6)] min-h-[85vh] p-8 flex flex-col items-center justify-center">
        <div className=" flex bg-[#fcf8f0] rounded-xl">
          <div className="p-4 flex flex-col items-center justify-center gap-4">
            <h1 className="text-3xl font-bold">Login</h1>
            <div className="py-8 flex flex-col gap-4">
              <form className="flex flex-col gap-4">
                <label>
                  Username:
                  <input className="p-2 rounded-xl w-full" type="text" placeholder="Enter your username"/>
                </label>
                <label>
                  Password:
                  <input className="p-2 rounded-xl w-full" type="password" placeholder="Enter your password" />
                </label>
                <div className="flex justify-center">
                  <button type="submit" className="w-32 bg-[#433526] text-[#f2e0c2] p-2 rounded-xl hover:bg-[#f2e0c2] hover:text-[#433526] transition duration-150">Login</button>
                </div>
              </form>
              <p>Forgot your password? <a href="./resetpassword" className="text-[#708c5a] border-b border-[#fcf8f0] hover:border-[#000] transition duration-150">Reset Password</a></p>
              <p>Don&apos;t have an account? <a href="./singup " className="text-[#708c5a] border-b border-[#fcf8f0] hover:border-[#000] transition duration-150">Sign Up</a></p>
            </div>
          </div>
          <img className="hidden lg:block w-[450px] rounded-xl" src="/Animalife.jpeg" alt="" />
        </div>
      </div>
    </div>
  )
}

export default Login