//using this component inorder to use useFormStatus hook for show pending status
//const { pending, data, method, action } = useFormStatus();
//Display a pending state during form submission

import { useFormStatus } from 'react-dom';

export default function Submit() {
    const { pending } = useFormStatus();

    return (
        <p className="actions">
            <button type="submit" disabled={pending}>{pending ? 'Submmiting' : 'Submit' }</button>
        </p>
  )
}