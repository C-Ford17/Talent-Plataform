import { logoutUser } from "@/features/auth/actions/logout.actions";

export function LogoutButton() {
  return (
    <form action={logoutUser}>
      <button 
        type="submit"
        className="text-sm text-red-600 hover:text-red-700 font-medium transition-colors"
      >
        Salir
      </button>
    </form>
  );
}
