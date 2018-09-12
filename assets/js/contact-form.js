(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function() {
    var form = document.querySelector('[data-contact-form]');

    if (form) {
      var submitButton = form.querySelector('button[type="submit"]');

      form.addEventListener('submit', handleSubmit);
      form.setAttribute('novalidate', true);
      form.addEventListener('blur', handleBlur, true);

      function handleSubmit(event) {
        event.preventDefault();

        var fields = event.target.elements;
        var hasErrors = null;
        var honeypotField = form.querySelector('input.js-tricky');

        if (honeypotField.checked) {
          return;
        }

        Array.from(fields).forEach(function(field) {
          var error = hasError(field);

          if (error) {
            showError(field, error);

            if (!hasErrors) {
              hasErrors = field;
            }
          }
        });

        if (hasErrors) {
          hasErrors.focus();
        } else {
          submitButton.disabled = true;
          submitButton.textContent = 'Wird gesendet...';

          handleFormSend(event.target);
        }
      }

      function handleFormSuccess() {
        if (this.status === 200) {
          showMessage('Vielen Dank, deine E-Mail wurde erfolgreich gesendet!', false);
          
          submitButton.textContent = 'Nachricht gesendet';
        } else {
          handleFormError(this.response);
        }
      }
      
      function handleFormError() {
        showMessage('Leider ist bei der Versendung deiner E-Mail ein Fehler aufgetreten. Versuche es bitte später erneut.');

        submitButton.textContent = 'Fehler aufgetreten';
      }

      function handleFormSend(form) {
        var xhr = new XMLHttpRequest();
        var data = new FormData(form);

        data.append('service_id', 'gmail');
        data.append('template_id', 'Z0mq45t');
        data.append('user_id', 'user_mZ5eVYgFOb6lQnj8gcvRJ');

        xhr.addEventListener('load', handleFormSuccess);
        xhr.addEventListener('error', handleFormError);
        xhr.open('POST', 'https://api.emailjs.com/api/v1.0/email/send-form');
        xhr.send(data);
      }

      function showMessage(message, isError = true) {
        var wrapper = document.createElement('div');
        var text = document.createElement('p');

        wrapper.classList.add('message', isError ? '-error' : '-success');
        text.classList.add('text');
        text.textContent = message;

        wrapper.appendChild(text);
        form.appendChild(wrapper);
      }

      function handleBlur(event) {
        if (!event.target.form.hasAttribute('data-contact-form')) {
          return;
        }

        var error = hasError(event.target);

        if (error) {
          showError(event.target, error);
          return;
        }

        removeError(event.target);
      }

      function showError(field, error) {
        field.classList.add('-error');

        var id = field.id || field.name;

        if (!id) {
          return;
        }

        var message = field.form.querySelector(`[data-form-error]#error-for-${id}`);

        if (!message) {
          message = document.createElement('p');
          message.className = 'error';
          message.id = `error-for-${id}`;
          message.setAttribute('data-form-error', true);

          field.parentNode.insertBefore(message, field.nextSibling);
        }

        field.setAttribute('aria-describedby', `error-for-${id}`);

        message.innerHTML = error;
      }

      function removeError(field) {
        field.classList.remove('-error');
        field.removeAttribute('aria-describedby');

        var id = field.id || field.name;

        
        if (!id) {
          return;
        }
        
        var message = field.form.querySelector(`[data-form-error]#error-for-${id}`);
        
        if (!message) {
          return;
        }

        message.remove();
      }

      function hasError(field) {
        var validity = field.validity;

        if (field.type === 'submit' || field.type === 'button') {
          return;
        }

        if (validity.valid) {
          return;
        }

        if (validity.valueMissing) {
          return 'Bitte fülle dieses Feld aus.';
        }

        if (validity.tooShort) {
          return 'Die Eingabe ist nicht lang genug.';
        }

        if (validity.patternMismatch || validity.typeMismatch) {
          return 'Bitte gebe eine gültige E-Mail an.';
        }
      }
    }
  });
})();