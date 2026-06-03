"use client";

export default function CertificateDownload({ courseId, courseTitle }: { courseId: string; courseTitle: string }) {
  const handleDownload = () => {
    const certificateData = `Certificate of Completion\n\n${courseTitle}\n\nCompleted on: ${new Date().toLocaleDateString()}\n\nThis certifies that you have successfully completed ${courseTitle}.`;
    const element = document.createElement("a");
    element.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(certificateData));
    element.setAttribute("download", `certificate-${courseId}.txt`);
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="mt-6 rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-4">
      <p className="text-sm font-semibold text-emerald-300">🎓 Certificate Earned</p>
      <p className="mt-2 text-xs text-emerald-200">You've completed this course!</p>
      <button
        onClick={handleDownload}
        className="mt-3 w-full rounded-lg bg-emerald-500 px-3 py-2 text-xs font-semibold text-white transition hover:bg-emerald-600"
      >
        Download Certificate
      </button>
    </div>
  );
}
