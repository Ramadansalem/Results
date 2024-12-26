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
        // Display the student result
        resultDiv.innerHTML = `
            <p><strong>اسم الطالب:</strong> ${student["اسم الطالب"]}</p>
            <p><strong>الرياضيات:</strong> ${student["الرياضيات"]}</p>
            <p><strong>العلوم:</strong> ${student["العلوم"]}</p>
            <p><strong>اللغة الإنجليزية:</strong> ${student["اللغة الإنجليزية"]}</p>
            <p><strong>التقدير العام:</strong> ${student["التقدير العام"]}</p>
          `;
      } else {
        resultDiv.innerHTML = "<p>رقم الجلوس غير موجود.</p>";
      }
    })
    .catch((error) => {
      resultDiv.innerHTML = `<p>حدث خطأ أثناء جلب البيانات: ${error.message}</p>`;
    });
});
