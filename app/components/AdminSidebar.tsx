import Link from "next/link";

export default function AdminSidebar() {
  const menuItems = [
    {
      title: "Dashboard",
      href: "/admin",
      icon: "🏠",
    },
    {
      title: "Posts",
      icon: "📝",
      subItems: [
        { title: "Add Post", href: "/admin/add-post" },
        { title: "View Posts", href: "/admin/posts" },
      ],
    },
    {
      title: "Categories",
      icon: "📂",
      subItems: [
        { title: "Add Category", href: "/admin/add-category" },
        { title: "View Categories", href: "/admin/category" },
      ],
    },
    {
      title: "Quizzes",
      icon: "🧠",
      subItems: [
        { title: "Add Quiz", href: "/admin/quiz" },
        { title: "View Quizzes", href: "/admin/quiz/ViewAllQuizzes" },
      ],
    },
    {
      title: "BCT Quizzes",
      icon: "🎓",
      subItems: [
        { title: "Add BCT Quiz", href: "/admin/BCTQuiz" },
        { title: "View BCT Quizzes", href: "/admin/BCTQuiz/ViewAllQuizzes" },
      ],
    },
    {
      title: "Engineering Notes",
      icon: "📚",
      href: "/admin/engineering-notes",
    },
  ];

  return (
    <div className="bg-gray-800 text-white h-full p-6 w-64 overflow-y-auto">
      <h2 className="text-2xl font-bold mb-8">
        <Link href="/admin" className="hover:text-gray-300">
          Admin Panel
        </Link>
      </h2>
      <nav>
        <ul className="space-y-2">
          {menuItems.map((item, index) => (
            <li key={index} className="mb-4">
              {item.subItems ? (
                <div>
                  <div className="flex items-center text-lg font-semibold mb-2">
                    <span className="mr-2">{item.icon}</span>
                    {item.title}
                  </div>
                  <ul className="ml-6 space-y-1">
                    {item.subItems.map((subItem, subIndex) => (
                      <li key={subIndex}>
                        <Link
                          href={subItem.href}
                          className="block py-1 px-2 rounded hover:bg-gray-700 transition-colors duration-200"
                        >
                          {subItem.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <Link
                  href={item.href}
                  className="flex items-center text-lg hover:text-gray-300 hover:bg-gray-700 py-2 px-2 rounded transition-colors duration-200"
                >
                  <span className="mr-2">{item.icon}</span>
                  {item.title}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
