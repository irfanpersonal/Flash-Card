import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface ReactToastifyProvidersProps {
    children: React.ReactNode
}

const ReactToastifyProvider: React.FunctionComponent<ReactToastifyProvidersProps> = ({children}) => {
    return (
        <>
            {children}
            <ToastContainer position="top-center"/>
        </>
    );
}

export default ReactToastifyProvider;