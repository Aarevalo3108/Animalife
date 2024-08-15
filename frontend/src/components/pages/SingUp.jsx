


const SingUp = () => {
  return (
  <div className="bg-[url('/Animalife.jpeg')] bg-cover bg-center min-h-[85vh]">
    <div className="bg-[rgba(0,0,0,0.6)] min-h-[85vh] p-8 flex flex-col items-center justify-center">
      <div className="flex bg-[#fcf8f0] rounded-xl">
        <div className="p-4 flex flex-col items-center justify-center gap-4">
          <h1 className="text-3xl font-bold">Sing Up</h1>
          <h2>Create your account</h2>
          <form className="flex flex-col gap-4 px-8 py-4">
            <label className="flex flex-col">
              Username:
              <input className="p-2 rounded-xl" type="text" placeholder="Enter your username" />
            </label>
            <label className="flex flex-col">
              Email:
              <input className="p-2 rounded-xl" type="email" placeholder="Enter your email" />
            </label>
            <label className="flex flex-col">
              Password:
              <input className="p-2 rounded-xl" type="password" placeholder="Enter your password" />
            </label>
            <button type="submit" className="bg-[#433526] text-[#f2e0c2] p-2 rounded-xl hover:bg-[#f2e0c2] hover:text-[#433526] transition duration-150">Sing Up</button>
            <p>Already have an account? <a href="./login" className="text-[#708c5a] border-b border-[#fcf8f0] hover:border-[#000] transition duration-150">Login</a></p>
          </form>
        </div>
        <img className="w-[450px] rounded-xl hidden lg:flex" src="/Animalife.jpeg" alt="" />
      </div>
    </div>
  </div>
  );
}

export default SingUp