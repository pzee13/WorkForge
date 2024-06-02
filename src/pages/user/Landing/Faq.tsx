import  { useState } from 'react';
import image from '../../../assets/svgs/image.svg';
import './faqWithImage.module.css';

const placeholder =
  'It can’t help but hear a pin drop from over half a mile away, so it lives deep in the mountains where there aren’t many people or Pokémon.';

const faqs = [
  { question: 'How can I reset my password?', answer: placeholder, id: 'reset-password' },
  { question: 'Can I create more than one account?', answer: placeholder, id: 'another-account' },
  { question: 'How can I subscribe to the monthly newsletter?', answer: placeholder, id: 'newsletter' },
  { question: 'Do you store credit card information securely?', answer: placeholder, id: 'credit-card' },
];

function Faq() {
  const [openItem, setOpenItem] = useState(null);

  const toggleItem = (id) => {
    setOpenItem(openItem === id ? null : id);
  };

  return (
    <div className="wrapper">
      <div className="container">
        <div className="grid" id="faq-grid">
          <div className="grid-col image-col">
            <img src={image} alt="Frequently Asked Questions" className="faq-image" />
          </div>
          <div className="grid-col faq-col">
            <h2 className="title">Frequently Asked Questions</h2>
            <div className="accordion">
              {faqs.map((faq) => (
                <div key={faq.id} className={`accordion-item ${openItem === faq.id ? 'open' : ''}`}>
                  <div className="accordion-control" onClick={() => toggleItem(faq.id)}>
                    {faq.question}
                  </div>
                  {openItem === faq.id && <div className="accordion-panel">{faq.answer}</div>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Faq;
