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
            <p><strong>مباديء تصميم مواقع الإنترنت:</strong> ${
              student["مباديء تصميم مواقع الإنترنت"] || "غير محدد"
            }</p>
            <p><strong>درجة الواجبات:</strong> ${
              student["درجة الواجبات"] || "غير محدد"
            }</p>
            <p><strong>درجة الكراسة:</strong> ${
              student["درجة الكراسة"] || "غير محدد"
            }</p>
            <p><strong>درجة السلوك:</strong> ${
              student["درجة السلوك"] || "غير محدد"
            }</p>
            <p><strong>درجة الحضور:</strong> ${
              student["درجة الحضور"] || "غير محدد"
            }</p>
            <p><strong>درجة النشاط والتطبيقات الشهرية:</strong> ${
              student["درجة النشاط والتطبيقات الشهرية"] || "غير محدد"
            }</p>
            <p><strong>مجموع اعمال الفصل الاول:</strong> ${
              student["مجموع اعمال الفصل الاول"] || "غير محدد"
            }</p>
          `;
      } else {
        resultDiv.innerHTML = "<p>رقم الجلوس غير موجود.</p>";
      }
    })
    .catch((error) => {
      resultDiv.innerHTML = `<p>حدث خطأ أثناء جلب البيانات: ${error.message}</p>`;
    });
});
