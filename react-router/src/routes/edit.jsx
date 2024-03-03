import { Form, redirect, useLoaderData, useNavigate } from 'react-router-dom';
import { getContact, updateContact } from '../contacts';

export async function loader({ params }) {
  const contact = await getContact(params.contactId);
  console.log('edit contact=', contact);

  return { contact };
}

export async function action({ request, params }) {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);

  console.log('edit updates=', updates);

  await updateContact(params.contactId, updates);

  return redirect(`/contacts/${params.contactId}`);
}

export default function EditContact() {
  const { contact } = useLoaderData();
  const navigation = useNavigate();

  return (
    <Form method="post" id="contact-form">
      <p>
        <span>Name</span>
        <input placeholder="First" aria-label="First name" type="text" name="first" defaultValue={contact.first} />
        <input placeholder="Last" aria-label="Last name" type="text" name="last" defaultValue={contact.last} />
      </p>
      <label>
        <span>Twitter</span>
        <input type="text" name="twitter" placeholder="@jack" defaultValue={contact.twitter} />
      </label>
      <label>
        <span>Avatar URL</span>
        <input placeholder="https://example.com/avatar.jpg" aria-label="Avatar URL" type="text" name="avatar" defaultValue={contact.avatar} />
      </label>
      <label>
        <span>Notes</span>
        <textarea name="notes" defaultValue={contact.notes} rows={6} />
      </label>
      <p>
        <button type="submit">Save</button>
        <button type="button" onClick={() => navigation(-1)}>
          Cancel
        </button>
      </p>
    </Form>
  );
}
