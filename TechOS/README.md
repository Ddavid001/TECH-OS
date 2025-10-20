# Welcome to your TECH SO

A robust, multi-tenant SaaS application designed to solve academic disruption caused by student and teacher absenteeism. PCA ensures that learning never stops by connecting teachers, students, and representatives in a seamless, real-time ecosystem.

---

##  About The Project

In many educational institutions, absenteeism disrupts the learning process, creates administrative overhead, and leads to poor academic outcomes. Traditional methods like manual tracking and informal communication channels (like WhatsApp) are inefficient, unprofessional, and chaotic.

The **TECH SO** was built to address this challenge head-on. It's not just another school management system; it's a dedicated platform to guarantee that the educational process continues, even when a teacher or student is physically absent. By providing clear, role-based dashboards and a powerful "Continuity Protocol," PCA transforms a problem into a managed process.

###  Key Features:

* **Multi-Role Dashboards:** Clean, intuitive interfaces tailored for Admins, Teachers, Students, and Representatives.
* **Real-Time Attendance:** Teachers can take attendance in seconds from a mobile-friendly interface.
* **Continuity Protocol:** Teachers can notify future absences and automatically release class materials, ensuring students never miss a learning opportunity.
* **Instant Notifications:** Representatives are instantly notified of their child's absence, fostering a collaborative school-home environment.
* **Secure & Scalable:** Built on Supabase with robust Row-Level Security to ensure data is private and secure for each institution.
* **Multilingual Support:** Ready for both English and Spanish-speaking users with `i18next` integration.

---

 Built With

* **Frontend:** [React](https://reactjs.org/) & [Vite](https://vitejs.dev/)
* **UI Components:** [Shadcn/ui](https://ui.shadcn.com/)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/)
* **Backend & Auth:** [Supabase](https://supabase.io/)
* **Internationalization:** [i18next](https://www.i18next.com/)

---

Getting Started

To get a local copy up and running, follow these simple steps.

### Installation

1.  **Clone the repo**
    ```sh
    git clone [https://github.com/your_username/your_repository_name.git](https://github.com/your_username/your_repository_name.git)
    ```
2.  **Navigate to the project directory**
    ```sh
    cd your_repository_name
    ```
3.  **Install NPM packages**
    ```sh
    npm install
    ```
4.  **Set up your environment variables**
    * Rename the `.env.local.example` file to `.env.local`.
    * Log in to your Supabase project.
    * Go to `Project Settings` > `API`.
    * Copy your `Project URL` and `anon (public) Key` and paste them into your `.env.local` file:
        ```env
        VITE_SUPABASE_URL="YOUR_SUPABASE_URL"
        VITE_SUPABASE_ANON_KEY="YOUR_SUPABASE_ANON_KEY"
        ```

5.  **Set up the Supabase database**
    * In the Supabase SQL Editor, run the SQL schema file located in the `supabase/schema.sql` directory of this project to create all the necessary tables and policies.
    * Remember to create the `createNewUser` Edge Function as well.

6.  **Run the development server**
    ```sh
    npm run dev
    ```
    Your application should now be running on `http://localhost:5173`.

---

##  License

Distributed under the MIT License. See `LICENSE.txt` for more information.

**Use your preferred IDE**

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

Use GitHub Codespaces

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS




