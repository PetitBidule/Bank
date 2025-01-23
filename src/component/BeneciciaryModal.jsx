import * as React from "react";
import { useFormik } from "formik";
import axios from "axios";
import Modal from '@mui/material/Modal';

export default function BeneciciaryModal() {
    const [open, setOpen] = React.useState(false);
    const [error, setError] = React.useState(null);
    const TOKEN = sessionStorage.getItem("token");

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const formik = useFormik({
        initialValues: {
            iban: ''
        },
        onSubmit: async (values, { setSubmitting }) => {
            try {
                const response = await axios.post('http://localhost:8000/add_benef', values, {
                    headers: {
                        'Authorization': `Bearer ${TOKEN}`
                    }
                });
                console.log('Beneficiary added successfully:', response.data);
                handleClose();
            } catch (error) {
                setError(error.response.data.detail);
                console.error('Error adding beneficiary:', error);
            } finally {
                setSubmitting(false);
            }
        }
    });

    return (
        <>
            <button onClick={handleOpen} className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-blue-600">Create a beneficiary</button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <div className='bg-black p-4 rounded-md shadow-md'>
                    <h1 className="text-xl font-bold mb-4">Add a beneficiary</h1>
                    {error && <p className="text-red-500 mb-4">{error}</p>}
                    <form onSubmit={formik.handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">IBAN</label>
                            <input
                                type="text"
                                name="iban"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.iban}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                            />
                            {formik.touched.iban && formik.errors.iban ? (
                                <div className="text-red-500 text-sm">{formik.errors.iban}</div>
                            ) : null}
                        </div>
                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-blue-600" disabled={formik.isSubmitting}>
                            {formik.isSubmitting ? 'Adding...' : 'Add Beneficiary'}
                        </button>
                    </form>
                </div>
            </Modal>
        </>
    );
}