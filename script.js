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

        // Iterate through all properties of the student
        for (let key in student) {
          if (key !== "رقم الجلوس" && key !== "اسم الطالب") {
            resultHTML += `<p><strong>${key}:</strong> ${
              student[key] || "غير محدد"
            }</p>`;
          }
        }

        resultDiv.innerHTML = resultHTML;
      } else {
        resultDiv.innerHTML = "<p>رقم الجلوس غير موجود.</p>";
      }
    })
    .catch((error) => {
      resultDiv.innerHTML = `<p>حدث خطأ أثناء جلب البيانات: ${error.message}</p>`;
    });
});
