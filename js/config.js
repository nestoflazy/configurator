function debounce(func, ms) {
  let timeout;
  return function() {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, arguments), ms);
  };
}

// Конфигуратор 1

const radioType = document.querySelectorAll("#radio-type input");
const radioPerf = document.querySelectorAll("#radio-perf input");
const radioCount = document.querySelectorAll("#radio-count input");
const radioReturn = document.querySelectorAll("#radio-return input");

let radioTypeValue = "";
let radioPerfValue = "";
let radioCountValue = "";
let radioReturnValue = "";

radioType?.forEach((el) =>
  el.addEventListener("change", (e) => {
    radioTypeValue = e.target.value;

    loadSchemeImage();
  })
);
radioPerf.forEach((el) =>
  el.addEventListener("change", (e) => {
    radioPerfValue = e.target.value;

    loadSchemeImage();
  })
);
radioCount.forEach((el) =>
  el.addEventListener("change", (e) => {
    radioCountValue = e.target.value;

    loadSchemeImage();
  })
);
radioReturn.forEach((el) =>
  el.addEventListener("change", (e) => {
    radioReturnValue = e.target.value;

    loadSchemeImage();
  })
);

// Конфигуратор 2

const radioEquipment = document.querySelectorAll("#radio-equipment input");
const radioProduct = document.querySelectorAll("#radio-product input");
const radioVolume = document.querySelectorAll("#radio-volume input");

const inputProduct = document.querySelector('#btnProductEnter1');
const inputVolume = document.querySelector('#btnProductEnter2');

let radioEquipmentValue = "";
let radioProductValue = "";
let radioVolumeValue = "";

let lastProductTarget = '';
let lastVolumeTarget = '';

radioEquipment.forEach((el) =>
  el.addEventListener("click", (e) => {
    radioEquipmentValue = e.target.value;    
    loadSchemeImage();
  })
);
radioProduct?.forEach((el) =>
  el.addEventListener("click", (e) => {
    if (e.target.id === 'btnProductEnter1') {
      lastProductTarget.checked = false;
      lastProductTarget = e.target;
      return;
    }

    if (radioProductValue === e.target.value && lastProductTarget.id === 'btnProductEnter1') {
      radioProductValue = e.target.value;
      lastProductTarget = e.target;
      inputProduct.value = '';
    } else if (radioProductValue === e.target.value) {
      e.target.checked = false;
      radioProductValue = '';
      lastProductTarget = '';
    } else {
      radioProductValue = e.target.value;
      lastProductTarget = e.target;
    }

    loadSchemeImage();
  })
);
radioVolume.forEach((el) =>
  el.addEventListener("click", (e) => {
    if (e.target.id === 'btnProductEnter2') {
      lastVolumeTarget.checked = false;
      lastVolumeTarget = e.target;
      return;
    }

    if (radioVolumeValue === e.target.value && lastVolumeTarget.id === 'btnProductEnter2') {
      radioVolumeValue = e.target.value;
      lastVolumeTarget = e.target;
      inputVolume.value = '';
    } else if (radioVolumeValue === e.target.value) {
      e.target.checked = false;
      radioVolumeValue = '';
      lastVolumeTarget = '';
    } else {
      radioVolumeValue = e.target.value;
      lastVolumeTarget = e.target;
    }

    loadSchemeImage();
  })
);

inputProduct?.addEventListener('input', (e) => {
  radioProductValue = e.target.value;

  loadSchemeImage();
})

inputVolume?.addEventListener('input', (e) => {
  radioVolumeValue = e.target.value;

  loadSchemeImage();
})

function loadSchemeImage(imageUrl = "../assets/img/scheme.png") {
  const schemeImg = document.querySelector(".scheme-image");
  const downloadIndicator = document.querySelector(".download-scheme");
  const activeDownloadBtn = document.querySelector(".item-scheme");

  if (!schemeImg || !downloadIndicator) {
    console.error("Не найдены необходимые элементы на странице");
    return;
  }

  // Показываем индикатор загрузки, скрываем основную картинку
  downloadIndicator.style.display = "block";
  schemeImg.style.display = "none";
  activeDownloadBtn.classList.remove("--active");

  // Создаем новое изображение для предзагрузки
  const preloadImg = new Image();

  // Обработка успешной загрузки
  preloadImg.onload = function () {
    // Подставляем URL в основное изображение
    schemeImg.src = imageUrl;

    // Ждем, пока основное изображение тоже загрузится
    schemeImg.onload = async function () {
      await new Promise((r) => setTimeout(r, 1000)); // - симуляция загрузки Потом удалить!!!!!

      // Показываем основное изображение, скрываем индикатор
      schemeImg.style.display = "block";
      activeDownloadBtn.classList.add("--active");
      downloadIndicator.style.display = "none";
      activeDownloadBtn.style.display = "flex";

      // Очищаем обработчики
      preloadImg.onload = null;
      preloadImg.onerror = null;
      schemeImg.onload = null;
      schemeImg.onerror = null;
    };

    // На случай ошибки загрузки основного изображения
    schemeImg.onerror = function () {
      console.error("Ошибка загрузки изображения:", imageUrl);
      downloadIndicator.style.display = "none";
      schemeImg.style.display = "block";
      schemeImg.src = ""; // Очищаем src
      schemeImg.alt = "Ошибка загрузки изображения";
    };
  };

  // Обработка ошибки загрузки
  preloadImg.onerror = function () {
    console.error("Ошибка загрузки изображения:", imageUrl);
    downloadIndicator.style.display = "none";
    schemeImg.style.display = "block";
    schemeImg.alt = "Ошибка загрузки изображения";

    // Очищаем обработчики
    preloadImg.onload = null;
    preloadImg.onerror = null;
  };

  // Начинаем загрузку
  preloadImg.src = imageUrl;
}
