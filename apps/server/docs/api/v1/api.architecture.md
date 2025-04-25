    Routes (routes.ts): The Front Door and Address. Defines where requests go (e.g., /auth/login, /auth/register). Connects the URL to the right person inside.

    Controller (controller.ts): The Receptionist/Traffic Director. Takes the incoming request, does quick checks (Did they bring the right basic forms?), directs the request to the correct department (Service), and tells the user the final outcome. It deals with the raw HTTP request and response.

    Service (service.ts): The Manager/Core Logic Department. Contains the actual business rules and orchestrates the process. How should a user actually be registered? Hash the password, check if the email exists, create the user record, maybe prepare a welcome email. It doesn't talk directly to the database details or the raw HTTP request.

    Repository (repository.ts): The Database Clerk/Storage Room Manager. Its only job is to talk to the database. Find a user by email, save a new user, update a user's token. It hides the specific database query details (SQL, NoSQL commands, ORM calls) from the Service.

    Validators (validators.ts): The Security Guard/Form Checker. Checks the incoming data thoroughly before it even gets to the Receptionist (Controller). Is the email a valid format? Is the password strong enough? Often implemented as middleware.

    Types (types.ts): The Blueprints/Definitions. Defines exactly what a "User" object looks like, what data is expected for login, etc. Essential for clarity and preventing errors, especially with TypeScript.

    Utils (utils.ts): The Toolbox. Contains reusable helper functions needed by different parts (e.g., a function to hash passwords, a function to generate tokens).