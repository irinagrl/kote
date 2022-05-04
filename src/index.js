import 'normalize.css';
import './style.css';
import './img/bgPattern.png';
import './img/cat.png';

(function () {
    //array
    const foodCards = [{
            text: 'Сказочное заморское яство',
            title: 'Нямушка',
            subtitle: 'с курой',
            pouches: '100 порций',
            mouse: '5 мышей в подарок',
            satisfaction: 'заказчик доволен',
            weight: 5,
            kg: 'кг',
            quantity: 1,
            textSelected: 'Филе из цыплят с трюфелями в бульоне.'
        },
        {
            text: 'Сказочное заморское яство',
            title: 'Нямушка',
            subtitle: 'с рыбой',
            pouches: '40 порций',
            mouse: '2 мыши в подарок',
            satisfaction: '',
            weight: 2,
            kg: 'кг',
            quantity: 0,
            textSelected: 'Головы щучьи с чесноком да свежайшая сёмгушка.'
        },
        {
            text: 'Сказочное заморское яство',
            title: 'Нямушка',
            subtitle: 'с фуа-гра',
            pouches: '10 порций',
            mouse: 'мышь в подарок',
            satisfaction: '',
            weight: 0.5,
            kg: 'кг',
            quantity: 1,
            textSelected: 'Печень утки разварная с артишоками.'
        }
    ];

    //render cards
    function render(foodCards) {
        for (let i = 0; i < foodCards.length; i++) {
            createCard(foodCards[i]);
        }
    }

    render(foodCards);

    function getCardElement(foodCard) {
        const cardTemplate = document.querySelector('#card__template').content;
        const cardElement = cardTemplate.cloneNode(true);

        cardElement.querySelector('.card__text').innerText = foodCard.text;
        cardElement.querySelector('.card__title').innerText = foodCard.title;
        cardElement.querySelector('.card__subtitle').innerText = foodCard.subtitle;
        cardElement.querySelector('.card__consist-item_pouches').innerText = foodCard.pouches;
        cardElement.querySelector('.card__consist-item_mouse').innerText = foodCard.mouse;
        cardElement.querySelector('.card__consist-item_satisfaction').innerText = foodCard.satisfaction;
        cardElement.querySelector('.card__weight__text').innerText = foodCard.weight;
        cardElement.querySelector('.card__weight__kg').innerText = foodCard.kg;
        cardElement.querySelector('.card__footer_selected').innerText = foodCard.textSelected;

        return cardElement;
    }

    //create cards
    function createCard(foodCard) {
        const container = document.querySelector('.container');
        const cardElement = getCardElement(foodCard);

        foodCard.quantity <= 0 ? editAbsentCard(cardElement, foodCard) : false;
        container.appendChild(cardElement);

        return container;
    }

    //style absent card
    function editAbsentCard(cardElement, foodCard) {
        cardElement.querySelector('.card__block').classList.add('card__block_absent');
        cardElement.querySelector('.card__frame').classList.add('card__frame_absent');
        cardElement.querySelector('.card__weight').classList.add('card__weight_absent');
        cardElement.querySelector('.card__footer-text').classList.add('card__footer_absent');
        cardElement.querySelector('.card__footer_absent').textContent = 'Печалька, ' + foodCard.subtitle + ' закончился.';
    }

    //hover onmouseover
    function mouseOverHandler(evt) {
        evt.stopPropagation();
        const hoverCard = evt.target.closest('.card');

        if (hoverCard === null) {
            return false;
        }
        if (hoverCard.querySelector('.card__frame').classList.contains('card__frame_absent')) {
            return false;
        }
        if (hoverCard.querySelector('.card__frame').classList.contains('card__frame_selected')) {
            hoverCard.querySelector('.card__frame').style.background = '';
            hoverCard.querySelector('.card__weight').style.background = '';
            hoverCard.querySelector('.card__text_selected').style.color = '';
        } else {
            hoverCard.querySelector('.card__frame').style.background = '#2EA8E6';
            hoverCard.querySelector('.card__weight').style.background = '#2EA8E6';
            hoverCard.querySelector('.card__footer-text_span').style.color = '#22A7E9';
        }
    };

    //hover onmouseout
    function mouseOutHandler(evt) {
        evt.stopPropagation();
        const hoverCard = evt.target.closest('.card');

        if (hoverCard === null) {
            return false;
        }
        if (hoverCard.querySelector('.card__frame').classList.contains('card__frame_absent')) {
            return false;
        }
        if (hoverCard.querySelector('.card__frame').classList.contains('card__frame_selected')) {
            hoverCard.querySelector('.card__frame').style.background = '#E52E7A';
            hoverCard.querySelector('.card__weight').style.background = '#E52E7A';
            hoverCard.querySelector('.card__text_selected').style.color = '#E52E7A';

        } else {
            hoverCard.querySelector('.card__frame').style.background = '';
            hoverCard.querySelector('.card__weight').style.background = '';
            hoverCard.querySelector('.card__footer-text_span').style.color = '';
        }
    };

    //select/unselect card
    function selectCardHandler(evt) {
        const selectedCard = evt.target.closest('.card');

        if (selectedCard === null) {
            return false;
        }
        if (selectedCard.querySelector('.card__frame').classList.contains('card__frame_absent')) {
            return false;
        }
        if (evt.target.classList.contains('card__footer-text')) {
            return false;
        }
        if (evt.target.classList.contains('card__footer_selected')) {
            return false;
        } else {
            selectedCard.querySelector('.card__frame').classList.toggle('card__frame_selected');
            selectedCard.querySelector('.card__weight').classList.toggle('card__weight_selected');
            updateTextFooter(selectedCard);
            mouseOverHandler(evt)
        }
    }

    //toggle text
    function updateTextFooter(selectedCard) {
        if (selectedCard.querySelector('.card__frame').classList.contains('card__frame_selected')) {
            selectedCard.querySelector('.card__text').style.display = 'none';
            selectedCard.querySelector('.card__text_selected').style.display = 'block';
            selectedCard.querySelector('.card__footer-text').style.display = 'none';
            selectedCard.querySelector('.card__footer_selected').style.display = 'block';
        } else {
            selectedCard.querySelector('.card__text').style.display = 'block';
            selectedCard.querySelector('.card__text_selected').style.display = 'none';
            selectedCard.querySelector('.card__footer_selected').style.display = 'none';
            selectedCard.querySelector('.card__footer-text').style.display = 'block';
        }
    }

    document.querySelector('.container').addEventListener('click', selectCardHandler);
    document.querySelector('.container').addEventListener('mouseover', mouseOverHandler);
    document.querySelector('.container').addEventListener('mouseout', mouseOutHandler);

}());