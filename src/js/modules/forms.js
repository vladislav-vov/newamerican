import { protectModule } from '../helpers/functions.js';

import { baseUrl } from '../utils/constants.js';

function forms() {
  const forms = document.querySelectorAll('.form');

  forms.forEach((form) => {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      try {
        const formData = new FormData(form);
        const formAction = form.getAttribute('action')
          ? form.getAttribute('action').trim()
          : '';

        if (!formAction.replace('/', '').length)
          throw new Error('Action is empty!');

        const response = await fetch(`${baseUrl}${formAction}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(Object.fromEntries(formData.entries())),
        });

        if (!response.ok) {
          const res = await response.json();
          throw new Error(
            `Failed to fetch data. Status: ${response.status}. Response: ${res.message}`,
          );
        } else {
          form.querySelectorAll('input').forEach((input) => {
            input.value = '';
          });
        }
      } catch (e) {
        console.error(`Error in form submission: ${e.message}`);
      }
    });
  });
}

export default protectModule(forms);
