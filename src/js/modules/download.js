import { baseUrl } from '../utils/constants.js';

class Download {
  constructor(selector) {
    this.btns = document.querySelectorAll(selector);
  }

  async downloadItem(file) {
    try {
      const response = await fetch(`${baseUrl}/files/${file}`);

      if (!response.ok) {
        throw new Error(`File "${file}" not found`);
      }

      const blob = await response.blob();

      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = file;

      link.style.display = 'none';

      document.body.appendChild(link);

      link.click();

      URL.revokeObjectURL(link.href);
      document.body.removeChild(link);
    } catch (error) {
      console.error(`Error downloading file: ${error.message}`);
    }
  }

  init() {
    this.btns.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();

        const file = e.target.getAttribute('data-download');

        this.downloadItem(file);
      });
    });
  }
}

export default Download;
