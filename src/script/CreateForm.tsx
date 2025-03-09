import React, { useRef } from 'react';

interface CreateFormProps {
  onCreate: (title: string, about: string) => void;
  showNotification: (message: string) => void;
}

const CreateForm: React.FC<CreateFormProps> = ({ onCreate, showNotification }) => {
  const titleRef = useRef<HTMLInputElement>(null);
  const aboutRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const title = titleRef.current?.value.trim() || '';
    const about = aboutRef.current?.value.trim() || '';

    if (!title || !about) {
      showNotification('Failed to create task:\nTitle and About fields must be filled in');
      return;
    }

    onCreate(title, about);
    if (titleRef.current) titleRef.current.value = '';
    if (aboutRef.current) aboutRef.current.value = '';
  };

  return (
    <form id="task-form" className="horizontal-flex" onSubmit={handleSubmit}>
      <div className="vertical-flex">
        <input type="text" ref={titleRef} placeholder="Title..." />
        <input type="text" ref={aboutRef} placeholder="About..." />
      </div>
      <div className="individual-button">
        <button type="submit" id="create-task">
          <img src="src/assets/icons/create.svg" alt="Create" />
        </button>
      </div>
    </form>
  );
};

export default CreateForm;