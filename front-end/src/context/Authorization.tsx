import { createContext, useEffect, useState } from "react";
import { redirect, useNavigate} from "react-router-dom";
import { iReactNode } from "../interfaces/context";
import Api from "../services";
import { iProfileApi, ProfileApi } from "../services/Profile";

export interface iAuthorization {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  users?: iProfileApi;
  GetReload: () => Promise<void>;
  direction: boolean
}
export const Authorization = createContext({} as iAuthorization);

function Authentication({ children }: iReactNode) {
  const [users, setUsers] = useState<iProfileApi>();
  const [loading, setLoading] = useState<boolean>(false);
  const [direction, setDirection] = useState<boolean>(true)
  const nav = useNavigate()

  
  useEffect(() => {
    const fetchUsers = async() => {
      const token = localStorage.getItem("token");
      
      if (token) {
        try{
          setDirection(true)
          Api.defaults.headers.authorization = `Bearer ${token}`;
          setLoading(true);
          const data = await ProfileApi();
          setUsers(data);
          setLoading(false);
          nav("/HomePage", {replace: true})
          
        }catch(error){
          console.error(error);
        }

       }
       setDirection(false)
    }
    return (()=>{
      
      fetchUsers();
    })
  }, []);

  const GetReload = async () => {
    const data = await ProfileApi();
    setUsers(data);
  };

  return (
    <Authorization.Provider value={{ loading, setLoading, users, GetReload, direction}}>
      {children}
    </Authorization.Provider>
  );
}

export default Authentication;
