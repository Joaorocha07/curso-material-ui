/* eslint-disable max-len */
import Swal, {
  SweetAlertIcon,
  SweetAlertOptions,
  SweetAlertResult,
} from 'sweetalert2'

interface ISweetAlertProps {
  title?: string;
  text?: string;
  icon?: SweetAlertIcon;
  showCancelButton?: boolean;
  confirmButtonColor?: string;
  cancelButtonColor?: string;
  confirmButtonText?: string;
  cancelButtonText?: string;
  showConfirmButton?: boolean
  timer?: number,
  secondAlertOptions?: {
    title: string;
    text: string;
    icon: SweetAlertIcon;
  };
}

type SweetAlertResponse = SweetAlertResult<
  SweetAlertResult<SweetAlertResponse> | { success: boolean; message: string }
>;

export default function SweetAlert({
  title,
  text,
  icon,
  showCancelButton,
  confirmButtonColor,
  cancelButtonColor,
  confirmButtonText,
  secondAlertOptions,
}: ISweetAlertProps): Promise<SweetAlertResponse> {
  const options: SweetAlertOptions = {
    title: title,
    text: text,
    icon: icon,
    showCancelButton: showCancelButton,
    confirmButtonColor: confirmButtonColor,
    cancelButtonColor: cancelButtonColor,
    confirmButtonText: confirmButtonText,
  }

  return Swal.fire(options).then((result) => {
    if (result.isConfirmed && secondAlertOptions) {
      return Swal.fire({
        title: secondAlertOptions.title,
        text: secondAlertOptions.text,
        icon: secondAlertOptions.icon,
      }).then(() => {
        return {
          isConfirmed: true,
          isDenied: false,
          isDismissed: false,
          value: { success: true, message: 'Operação realizada com sucesso' },
        }
      })
    } else {
      return {
        isConfirmed: false,
        isDenied: false,
        isDismissed: true,
        value: { success: false, message: 'Operação cancelada' },
      }
    }
  })
}
