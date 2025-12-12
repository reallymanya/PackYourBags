import { createContext, useEffect, useReducer } from "react";

const initial_state = {

    user : localStorage.getItem('user') !== undefined ? JSON.parse(localStorage.getItem('user')) : null,
    loading : false,
    error : null,
    isVerified: false, // Add verification status
    verificationLoading: false, // Separate loading for verification
    resetPasswordLoading: false // Separate loading for password reset
}

export const AuthContext = createContext(initial_state)

const AuthReducer = (state, action) => {
    switch (action.type){
        case "LOGIN_START":
            return {
                user:null,
                loading:true,
                error:null,
            };
            case 'LOGIN_SUCCESS' :
                return {
                    user:action.payload,
                    loading:false, 
                    error:null
                }
            case 'LOGIN_FAILURE' :
                return {
                    user:null,
                    loading:false,
                    error:action.payload
                }
            case 'LOGOUT' :
                return {
                    user:null,
                    loading:false,
                    error:null  
                }
            case 'REGISTER_SUCCESS' :
                return {
                    user:null,
                    loading:false,
                    error:null
                }

                case "VERIFICATION_START":
                    return {
                      ...state,
                      verificationLoading: true,
                      error: null
                    };
                  case "VERIFICATION_SUCCESS":
                    return {
                      ...state,
                      isVerified: true,
                      verificationLoading: false,
                      error: null
                    };
                  case "VERIFICATION_FAILURE":
                    return {
                      ...state,
                      verificationLoading: false,
                      error: action.payload
                    };
                  case "PASSWORD_RESET_START":
                    return {
                      ...state,
                      resetPasswordLoading: true,
                      error: null
                    };
                  case "PASSWORD_RESET_SUCCESS":
                    return {
                      ...state,
                      resetPasswordLoading: false,
                      error: null
                    };
                  case "PASSWORD_RESET_FAILURE":
                    return {
                      ...state,
                      resetPasswordLoading: false,
                      error: action.payload
                    };

            default : 
            return state
    }
};

export const AuthContextProvider = ({children}) => {
    const [state, dispatch] =useReducer(AuthReducer, initial_state)

    useEffect(() =>{
        localStorage.setItem('user', JSON.stringify(state.user))
    },[state.user])

    return <AuthContext.Provider value={{
        user:state.user,
        loading:state.loading,
        error:state.error,
        isVerified: state.isVerified,
      verificationLoading: state.verificationLoading,
      resetPasswordLoading: state.resetPasswordLoading,
        dispatch,
    }}>
        {children}
        
    </AuthContext.Provider>
 }
