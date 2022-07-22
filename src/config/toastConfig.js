import React  from 'react';
import { Store } from 'react-notifications-component';
import '../assets/style/toast.scss'

const toastConfig = (type, mess) => {

    const getIcon = (type) => {
        let classIcon = '';
        switch (type) {
            case 'Success':
                classIcon = 'fas fa-check-circle';
                break;

            case 'Error':
                classIcon = 'fas fa-exclamation-triangle'
                break;

            case 'Danger':
                classIcon = 'fas fa-exclamation-circle';
                break;

            case 'Warning':
                classIcon = 'fas fa-engine-warning'
                break;
        
            default:
                break;
        }

        return classIcon;
    }

    const contentMess = (type, mess) => {
        return (
            <>
                <div className='container-mess'>
                    <div className='toast-icon'>
                        <i className={getIcon(type)}></i>
                    </div>
                    <div className='toast-content'>{mess}</div>
                </div>
            </>
        )
    }

    Store.addNotification({
        title: type,
        message: contentMess(type, mess),
        type: type === 'Error' ? 'danger' : type,
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
            duration: 4000,
            onScreen: true,
            showIcon: true,
        },
        dismissIcon: {
            success: true,
        }
    });
}

export default toastConfig;