import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="content-login">
      <div className="form-login">
        <div className="text-center">
          <h1>Registrate</h1>
          <form>
            <div className="form-group my-2">
              <label>Email</label>
              <input
                type="email"
                placeholder="Email"
                className="form-control"
              />
            </div>
            <div className="form-group my-2">
              <label>Password</label>
              <input
                type="password"
                placeholder="Password"
                className="form-control"
              />
            </div>
            <br />
            <Link href="/login">Login</Link>
            <div className="my-2 d-flex justify-content-center">
              <button type="submit" className="btn btn-primary px-5">
                Registrarse
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
