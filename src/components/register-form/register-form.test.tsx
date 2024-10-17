import { User } from "../../store/user/user.types";
import { fireEvent, renderWithProviders, screen, waitFor } from "../../utils/test-utils";
import RegisterForm from "./register-form.component";
import axios from 'axios';

const login = jest.fn();
jest.mock("axios");

describe('register form component tests', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should load a form with all the required inputs', () =>{
        renderWithProviders(<RegisterForm handleRegisterSuccess={login} startGoogleLogin={() => {}} preloadedUser={null}/>);

        expect(screen.getByRole('textbox', {name: 'Nombre'})).toBeInTheDocument();
        expect(screen.getByRole('textbox', {name: 'Apellidos'})).toBeInTheDocument();
        expect(screen.getByRole('textbox', {name: 'Email'})).toBeInTheDocument();
        expect(screen.getByLabelText('Contraseña')).toBeInTheDocument();
        expect(screen.getByLabelText('Confirma la contraseña')).toBeInTheDocument();
        expect(screen.getByRole('button', {name: 'Registrarte'})).toBeInTheDocument();
    });

    it('should display error on wrong input', async () =>{
        renderWithProviders(<RegisterForm handleRegisterSuccess={login} preloadedUser={null} startGoogleLogin={() => {}}/>);

        const nombreInput = screen.getByRole('textbox', {name: 'Nombre'});
        const apellidosInput = screen.getByRole('textbox', {name: 'Apellidos'});
        const emailInput = screen.getByRole('textbox', {name: 'Email'});
        const passwordInput = screen.getByLabelText('Contraseña');
        const passwordConfirmInput = screen.getByLabelText('Confirma la contraseña');
        const submitButton = screen.getByRole('button', {name: 'Registrarte'});

        // --------------------------- firstname --------------------------
        fireEvent.change(apellidosInput, { target: { value: "Lopez"}});
        fireEvent.change(emailInput, { target: { value: "asd@asd.com"}});
        fireEvent.change(passwordInput, { target: { value: "Test12345"}});
        fireEvent.change(passwordConfirmInput, { target: { value: "Test12345"}});
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(screen.getByRole('alert')).toBeInTheDocument();
        });

        expect(screen.getByRole('alert')).toHaveTextContent('Campo nombre es requerido');
        
        fireEvent.change(nombreInput, { target: { value: "a"}});
        
        await waitFor(() => {
            expect(screen.getByRole('alert')).toBeInTheDocument();
        });

        expect(screen.getByRole('alert')).toHaveTextContent('Campo nombre requiere de 3 caracteres');

        fireEvent.change(nombreInput, { target: { value: "qwerty"}});

        await waitFor(() => {
            expect(screen.queryByRole('alert')).not.toBeInTheDocument();
        });


        // --------------------------- apellidos --------------------------
        fireEvent.change(apellidosInput, { target: { value: ""}});
        await waitFor(() => {
            expect(screen.getByRole('alert')).toBeInTheDocument();
        });

        expect(screen.getByRole('alert')).toHaveTextContent('Campo apellidos es requerido');
        
        fireEvent.change(apellidosInput, { target: { value: "a"}});
        
        await waitFor(() => {
            expect(screen.getByRole('alert')).toBeInTheDocument();
        });

        expect(screen.getByRole('alert')).toHaveTextContent('Campo apellidos requiere de 3 caracteres');

        fireEvent.change(apellidosInput, { target: { value: "Lopez"}});

        await waitFor(() => {
            expect(screen.queryByRole('alert')).not.toBeInTheDocument();
        });


        // --------------------------- email --------------------------
        fireEvent.change(emailInput, { target: { value: ""}});
        await waitFor(() => {
            expect(screen.getByRole('alert')).toBeInTheDocument();
        });

        expect(screen.getByRole('alert')).toHaveTextContent('Campo email es requerido');
        
        fireEvent.change(emailInput, { target: { value: "a"}});
        
        await waitFor(() => {
            expect(screen.queryByRole('alert')).not.toBeInTheDocument();
        });


        // --------------------------- contraseña --------------------------
        fireEvent.change(passwordInput, { target: { value: "holaa"}});
        fireEvent.change(passwordConfirmInput, { target: { value: "holaa"}});
        await waitFor(() => {
            expect(screen.getByRole('alert')).toBeInTheDocument();
        });

        expect(screen.getByRole('alert')).toHaveTextContent('Formato invalido');
        
        fireEvent.change(passwordInput, { target: { value: "Test12345"}});
        fireEvent.change(passwordConfirmInput, { target: { value: "Test12345"}});
        
        await waitFor(() => {
            expect(screen.queryByRole('alert')).not.toBeInTheDocument();
        });

        // --------------------------- confirmacion de contraseña --------------------------
        fireEvent.change(passwordInput, { target: { value: "Test123456"}});
        await waitFor(() => {
            expect(screen.getByRole('alert')).toBeInTheDocument();
        });

        expect(screen.getByRole('alert')).toHaveTextContent('Las contraseñas no coinciden');
        
        fireEvent.change(passwordConfirmInput, { target: { value: "Test123456"}});
        
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
        renderWithProviders(<RegisterForm handleRegisterSuccess={login} startGoogleLogin={() => {}} preloadedUser={null}/>);

        const nombreInput = screen.getByRole('textbox', {name: 'Nombre'});
        const apellidosInput = screen.getByRole('textbox', {name: 'Apellidos'});
        const emailInput = screen.getByRole('textbox', {name: 'Email'});
        const passwordInput = screen.getByLabelText('Contraseña');
        const passwordConfirmInput = screen.getByLabelText('Confirma la contraseña');
        const submitButton = screen.getByRole('button', {name: 'Registrarte'});

        fireEvent.change(nombreInput, { target: { value: "Hercules"}});
        fireEvent.change(apellidosInput, { target: { value: "Lopez"}});
        fireEvent.change(emailInput, { target: { value: "a"}});
        fireEvent.change(passwordInput, { target: { value: "Test12345"}});
        fireEvent.change(passwordConfirmInput, { target: { value: "Test12345"}});
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(axios.post).toHaveBeenCalledWith('http://localhost:3001/api/auth/register', expect.anything());
        });

        expect(login).toHaveBeenCalledWith(user, 'Registro exitoso');
    });
});