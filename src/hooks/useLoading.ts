import { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

const useLoading = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const withLoading = async <T>(asyncFn: () => Promise<T>) => {
    try {
      setIsLoading(true);
      return await asyncFn();
    } catch(error){
      toast.error('Упс! Произошла ошибка сервера.');
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, withLoading };
};

export default useLoading;