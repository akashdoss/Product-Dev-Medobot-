---

# 🩺 Medobot – Your Virtual Medical Assistant

Medobot is an intelligent, AI-powered healthcare chatbot designed to help users with symptom checking, medicine identification using image input 📸, health-related queries, and hospital locator services 🏥. With a simple interface built using Flask and HTML, and powered by Tesseract OCR and the LLaMA API from SambaNova, Medobot is tailored for quick and user-friendly medical assistance.

---

## 📂 Project Structure

Your project is cleanly structured as shown in the snippet:

```
├── static/
│   ├── script.js         # JavaScript file for client-side interactivity
│   └── style.css         # CSS file for styling the frontend
├── templates/
│   ├── hospital_locator.html   # UI for locating nearby hospitals
│   ├── image_query.html        # Upload prescriptions/medicine images
│   ├── index.html              # Home page
│   ├── landing.html            # Landing or intro page
│   ├── modules.html            # Navigation to features
│   └── text_query.html         # Enter symptoms or text queries
├── app.py               # Flask backend application
├── requirements.txt     # Python dependencies
└── .gitattributes       # Git configuration
```

---

## 🚀 Features

- 🔍 **Text-Based Medical Query**: Users can ask health-related questions, check symptoms, or request first-aid advice.
- 📸 **Image-Based Medicine Identification**: Upload a prescription or medicine strip to get medicine name and dosage extracted via OCR.
- 🏥 **Hospital Locator**: Uses location input to suggest nearby hospitals or clinics using map-based services.
- 💬 **Multi-Modal Support**: Supports both image and text input.
- 🧠 **Powered by LLaMA API**: Uses the LLaMA API (from SambaNova) for generating accurate and relevant medical responses.
- ✅ Simple and accessible UI with clean HTML and CSS.

---

## 🛠️ Technology Stack

| Component               | Technology Used         |
|------------------------|-------------------------|
| Backend Framework      | Flask (Python)          |
| Frontend Templates     | HTML, CSS, JavaScript   |
| OCR Engine             | Tesseract OCR           |
| AI/LLM Integration     | LLaMA API (SambaNova)   |
| API Middleware         | Flask API               |
| Deployment/Hosting     | Localhost (no cloud)    |

---

## 💻 How to Run the Project

### 🔧 Prerequisites

Make sure you have Python 3.x installed. Then, clone the repository and install dependencies.

```bash
git clone https://github.com/yourusername/medobot.git
cd medobot
pip install -r requirements.txt
```

### ▶️ Start the Flask Server

```bash
python app.py
```

The server will start at `http://127.0.0.1:5000`. Open it in your browser to access the Medobot interface.

---

## 📁 Page Guide

- `index.html` – Starting point of Medobot.
- `landing.html` – Overview of features and welcome.
- `modules.html` – Allows users to choose between image/text input and hospital search.
- `text_query.html` – Interface for asking symptom-based questions.
- `image_query.html` – Upload image of prescription or medicine.
- `hospital_locator.html` – Search for nearby hospitals.

---

## 🤖 How It Works

1. The user selects a feature (text, image, or hospital locator) via `modules.html`.
2. For text:
   - The user enters a question or symptoms.
   - It's processed by the Flask backend and LLaMA API to return a response.
3. For image:
   - The image is processed by Tesseract OCR to extract medicine info.
   - The response is generated using the extracted text.
4. For hospital search:
   - The user inputs their location or pin code.
   - The system returns a list of nearby hospitals (static or dynamically fetched).

---
## 🚀 Future Enhancements  

Medobot has room to grow! Future upgrades may include:
- 🗣️ Voice input and multilingual support  
- 📊 Health history and record tracking  
- 📱 Mobile-first UI improvements  
- 🧬 Disease prediction using health record trends  

---

## 👨‍⚕️ Use Cases  

Medobot is designed to assist:
- 📌 Patients needing quick symptom insights  
- 📌 Caregivers verifying medicines from prescriptions  
- 📌 Travelers or emergency situations to find nearest hospitals  
- 📌 Users seeking basic health guidance or home remedies  

---
##Outputs

![image alt](https://github.com/akashdoss/Product-Dev-Medobot-/blob/main/login%20page.jpg?raw=true)
---
![image alt](https://github.com/akashdoss/Product-Dev-Medobot-/blob/main/text-query.jpg?raw=true)
---
![image alt](https://github.com/akashdoss/Product-Dev-Medobot-/blob/main/Image-query.jpg?raw=true)
---
![image alt](https://github.com/akashdoss/Product-Dev-Medobot-/blob/main/Hospital-locator.jpg?raw=true)

---

## 📌 Note

- This is a prototype for educational and demonstration purposes only.
- The chatbot does **not** replace professional medical advice.

---

## ❤️ Contributing

Pull requests are welcome! If you have suggestions or improvements, feel free to contribute or open an issue.

---


