import { User } from "../../store/user/user.types";
import { fireEvent, renderWithProviders, screen, waitFor } from "../../utils/test-utils";
import LoginForm from "./login-form.component";
import axios from 'axios';

const login = jest.fn();
jest.mock("axios");

describe('Login form component tests', () => {
    it('should load a form with all the required inputs', () =>{
        renderWithProviders(<LoginForm handleLoginSuccess={login} startGoogleLogin={() => {}}/>);

        expect(screen.getByRole('textbox', {name: 'Email'})).toBeInTheDocument();
        expect(screen.getByLabelText('Contraseña')).toBeInTheDocument();
        expect(screen.getByRole('button', {name: 'Iniciar sesión'})).toBeInTheDocument();
    });

    it('should display error on wrong input', async () =>{
        renderWithProviders(<LoginForm handleLoginSuccess={login} startGoogleLogin={() => {}}/>);

        const emailInput = screen.getByRole('textbox', {name: 'Email'});
        const passwordInput = screen.getByLabelText('Contraseña');
        const submitButton = screen.getByRole('button', {name: 'Iniciar sesión'});

        // --------------------------- email --------------------------
        fireEvent.change(passwordInput, { target: { value: "a"}});
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(screen.getByRole('alert')).toBeInTheDocument();
        });

        expect(screen.getByRole('alert')).toHaveTextContent('Campo email es requerido');
        
        fireEvent.change(emailInput, { target: { value: "ajfsnafsj"}});
        
        await waitFor(() => {
            expect(screen.getByRole('alert')).toBeInTheDocument();
        });


        // --------------------------- contraseña --------------------------
        fireEvent.change(passwordInput, { target: { value: ""}});
        await waitFor(() => {
            expect(screen.getByRole('alert')).toBeInTheDocument();
        });

        expect(screen.getByRole('alert')).toHaveTextContent('Campo contraseña es requerido');
        
        fireEvent.change(passwordInput, { target: { value: "Test12345"}});
        
        await waitFor(() => {
            expect(screen.queryByRole('alert')).not.toBeInTheDocument();
        });
    });

    it('should submit the correct data', async () =>{
        const user: User = {
            id: 1,
            email: 'a',
            name: 'Hercules',
            lastname: 'Lopez'
        };
        const response = {data: user, status: 200};
        (axios.post as jest.Mock).mockResolvedValue(response);
        renderWithProviders(<LoginForm handleLoginSuccess={login} startGoogleLogin={() => {}}/>);
        const emailInput = screen.getByRole('textbox', {name: 'Email'});
        const passwordInput = screen.getByLabelText('Contraseña');
        const submitButton = screen.getByRole('button', {name: 'Iniciar sesión'});

        fireEvent.change(emailInput, { target: { value: "a"}});
        fireEvent.change(passwordInput, { target: { value: "Test12345"}});
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(axios.post).toHaveBeenCalledWith('http://localhost:3001/api/auth/login', expect.anything());
        });

        expect(login).toHaveBeenCalledWith(user, 'Inicio de sesion exitoso');
    });
});