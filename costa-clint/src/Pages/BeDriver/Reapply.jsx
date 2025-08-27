import React from 'react';
import axiosSecurePublic from '../../Service/APIs/AxiosPublic';
import useAuth from '../../Hooks/useAuth';
import Swal from 'sweetalert2';

const Reapply = ({existingApp,refetch}) => {
    const {user} = useAuth()
    if (existingApp?.application_status === "rejected") {
 

  return (
    
  );
}

};

export default Reapply;