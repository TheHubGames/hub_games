function setLocalStorageItem(name, value, days) {
          if (days) {
              var date = new Date();
              date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
              localStorage.setItem(name, value);
              localStorage.setItem(name + '_expiry', date.toISOString());
          } else {
              localStorage.setItem(name, value);
          }
      }

      function getLocalStorageItem(name) {
          var expiry = localStorage.getItem(name + '_expiry');
          if (expiry && new Date(expiry) < new Date()) {
              // Item has expired, remove it
              localStorage.removeItem(name);
              localStorage.removeItem(name + '_expiry');
              return null;
          }
          return localStorage.getItem(name);
      }

      function closeWarning() {
          document.getElementById('warning').style.display = 'none';
          setLocalStorageItem('warningClosed', 'true', 30);
          console.log('LocalStorage item set:', getLocalStorageItem('warningClosed'));
      }

      document.addEventListener("DOMContentLoaded", function () {
          var warningClosed = getLocalStorageItem('warningClosed');
          // console.log('LocalStorage item value:', warningClosed);
          if (warningClosed == 'true') {
              document.getElementById('warning').style.display = 'none';
          }
      });
