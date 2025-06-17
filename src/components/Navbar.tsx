import { NavLink } from "react-router";

export default function Navbar(){
    return (
        <>
            {/* <NavLink to="/" className="flex items-center mb-5 md:mb-0">
                <span className="text-xl font-black text-gray-900 select-none">
                REST<span className="text-green-600">Explora</span>
                </span>
            </NavLink> */}
            <nav style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '10px', padding: '20px' }}>
                <NavLink
                    to="/"
                    end
                    className={({ isActive }) =>
                        `mr-5 font-medium hover:text-gray-900 ${isActive ? "text-green-600 font-bold" : "text-gray-600"}`
                    }
                >
                Home
                </NavLink>
                <NavLink
                    to="/dashboard"
                    className={({ isActive }) =>
                        `mr-5 font-medium hover:text-gray-900 ${isActive ? "text-green-600 font-bold" : "text-gray-600"}`
                    }
                >
                Dashboard
                </NavLink>
            </nav>
        </>
    );
}