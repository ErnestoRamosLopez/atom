import { NavigateFunction, Params } from 'react-router-dom';
import axios, { Axios, AxiosError } from "axios";
import { User } from '../store/user/user.types';
import { Dispatch } from '@reduxjs/toolkit';
import { setCurrentUser } from '../store/user/user.action';
import { setLoginUserData } from '../store/login/login.action';
import { ParsedQuery } from 'query-string';
import * as jose from 'jose';
import { resetState } from '../store/root-reducer';
import { toast } from 'react-toastify';
const apiUrl = process.env.REACT_APP_API_BASE_URL ?? '';

interface LoginValidateResponse{
    error?: string,
    userData?: Partial<User>,
    completedRegistration?: boolean
}

interface LoginValidateParams{
    hashQueryParams: ParsedQuery<string>,
    dispatch: Dispatch,
    redirect: string,
    navigate: NavigateFunction
}

export async function validateLoginSuccess(params: LoginValidateParams): Promise<boolean>{
    let { hashQueryParams, dispatch, redirect } = params;
    if(!hashQueryParams.id_token){
        return false;
    }
    let decodedJWT = jose.decodeJwt(hashQueryParams.id_token as string);
    let nonce = sessionStorage.getItem('nonce');
    if( decodedJWT.nonce !== nonce){
        return false;
    }
    try{
        let response = await axios.post(`${apiUrl}/auth/loginValidateToken`, {
            id_token: hashQueryParams.id_token,
            login_type: hashQueryParams.state
        });
        let loginResponse: LoginValidateResponse =  response.data;
        if(loginResponse.error){
            throw new Error(loginResponse.error);
        }

        //si hace falta informacion, levanta modal
        if( loginResponse.completedRegistration){
            dispatch(setCurrentUser(loginResponse.userData as User));
        }else{
            let data = {
                userData: loginResponse.userData!,
                cancelRedirect: redirect
            }
            dispatch(setLoginUserData(data));
        }
        clearGoogleHashParams(params.navigate);
        return true;
    }catch{
        return false;
    }
}

export function generateNonce() {
    const array = new Uint32Array(10); // Or some secure length
    window.crypto.getRandomValues(array);
    return Array.from(array, dec => dec.toString(36)).join('');
}

export async function logout(axios: Axios, navigate: NavigateFunction, dispatch: Dispatch, redirect = '/') {
    try{
        await axios.post(`${apiUrl}/auth/logout`);
    }catch{
        
    }finally{
        toast('La sesion ha finalizado', {
            type: 'warning',
            toastId: 'logout-alert'
        });
        dispatch(resetState());
        navigate(redirect);
    }
}

function clearGoogleHashParams(navigate: NavigateFunction){
    const cleanUrl = window.location.pathname + window.location.search;

    navigate(cleanUrl, { replace: true });
}