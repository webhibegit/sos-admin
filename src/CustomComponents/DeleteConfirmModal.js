import Swal from "sweetalert2"

export const DeleteConfirmModal = (deleteFunction) => {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Delete'
    }).then((result) => {
        if (result.isConfirmed) {
            deleteFunction();
            // Swal.fire(
            //     'Deleted!',
            //     'Your file has been deleted.',
            //     'success'
            // )
        }
    })
}