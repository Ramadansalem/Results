document.getElementById("search-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const studentId = document.getElementById("student-id").value.trim();
  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = ""; // Clear previous result

  // Fetch the JSON file
  fetch("results.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch the data");
      }
      return response.json();
    })
    .then((data) => {
      // Find the student by رقم الجلوس
      const student = data.find((item) => item["رقم الجلوس"] === studentId);

      if (student) {
        // Start building the result
        let resultHTML = `<p><strong>اسم الطالب:</strong> ${student["اسم الطالب"]}</p>`;

        // Displaying results for each subject
        const subjects = [
          "مباديء تصميم مواقع الإنترنت",
          "التدريبات العملية",
          "تحليل وتصميم النظم",
        ];

        subjects.forEach((subject) => {
          if (student[subject]) {
            resultHTML += `<p><strong>${subject}:</strong> ${student[subject]}</p>`;
          } else {
            resultHTML += `<p><strong>${subject}:</strong> غير محدد</p>`;
          }
        });

        resultDiv.innerHTML = resultHTML;
      } else {
        resultDiv.innerHTML = "<p>رقم الجلوس غير موجود.</p>";
      }
    })
    .catch((error) => {
      resultDiv.innerHTML = `<p>حدث خطأ أثناء جلب البيانات: ${error.message}</p>`;
    });
});
