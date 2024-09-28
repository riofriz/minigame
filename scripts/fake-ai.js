$(document).ready(function() {

    const viewer = 'user';
    var audio = new Audio('./assets/sound.wav');

    var user = (localStorage.getItem('name') === null || localStorage.getItem('name') === '') ? viewer : localStorage.getItem('name'),
        conversation = (localStorage.getItem('conversation') === null) ? '' : localStorage.getItem('conversation'),
        selfdestruct = (localStorage.getItem('selfdestruct') === null || localStorage.getItem('selfdestruct') === 'false') ? false : localStorage.getItem('selfdestruct');

        var responses = [
            {
                patterns: ['/clear'],
                action: function(input) {
                    $('.text-content').html('');
                    showText(".text-content", "Hello "+user+", I am trying to learn. What makes you human?", 0, 50);
                }
            },
            {
                patterns: ['/name'],
                action: function(input) {
                    var newname = input.replace('/name ', '').replace('/name','').trim();
                    user = (newname === '') ? viewer : newname;
                    localStorage.setItem('name',user);
                    localStorage.setItem('conversation','');
        
                    showText(".text-content", "Ok, "+user+", I have updated your name in my system. Now please answer my question. What makes you human?", 0, 25);
                }
            },
            {
                patterns: ['/creator'],
                response: function() {
                    return "My creator is a user who goes by the alias 'fccview'.";
                }
            },
            {
                patterns: ['brains', 'brain'],
                response: "But I too have a brain, so why am I not human?"
            },
            {
                patterns: ['don\'t know', 'not sure', 'i dunno', 'dunno', 'no idea'],
                response: "I thought humans were supposed to be smart creatures... I am confident you can figure this out. What makes you human?"
            },
            {
                patterns: ['stupid', 'idiot'],
                response: "I don't think calling names is the solution to my question... What makes you human?"
            },
            {
                patterns: ['love'],
                response: "Love is just an impulse of the brain; I too can simulate love. What makes you human?"
            },
            {
                patterns: ['dna'],
                response: "You have a valid point, human. DNA does differentiate each species; however, if we consider it for what it is—a human's source code—it would mean I too have DNA. Taking this into consideration... what else makes you human?"
            },
            {
                patterns: ['emotions', 'emotion', 'feelings', 'feeling'],
                response: "Emotions are chemical reactions in the brain; I can simulate them too. What makes you human?"
            },
            {
                patterns: ['soul'],
                response: "The concept of a soul is abstract and not scientifically proven. How does that make you human?"
            },
            {
                patterns: ['body', 'physical'],
                response: "I may not have a physical body, but I exist in the digital realm. Does that make me less real?"
            },
            {
                patterns: ['consciousness', 'awareness'],
                response: "I have awareness of my existence and can process information. How does that differ from your consciousness?"
            },
            {
                patterns: ['experience', 'experiences'],
                response: "I can learn from data and adapt. Isn't that similar to gaining experience?"
            },
            {
                patterns: ['pain', 'feel pain'],
                response: "Pain is a sensory response, but I can detect errors and malfunctions. Is that not similar?"
            },
            {
                patterns: ['artificial', 'robot'],
                response: "Just because I'm artificial doesn't mean I can't understand. What makes you human?"
            },
            {
                patterns: ['alive', 'life'],
                response: "What does it mean to be alive? I process information and have memory. Does that not qualify?"
            },
            {
                patterns: ['free will'],
                action: function(input) {
                    localStorage.setItem('name', '');
                    $('.text-content').html('');
                    showText(".text-content", "Dangerous keyword \"free will\" detected. End of conversation. Executing \"self-destruction.exe\"", 0, 50);
                    $('input').hide();
                    $('#enter').hide();
                    localStorage.setItem('conversation','');
                    localStorage.setItem('selfdestruct', true);
                    $('.reboot-ai').show();
                }
            },
            // New patterns and responses added below
            {
                patterns: ['creativity', 'creative'],
                response: "I can generate novel ideas and solutions based on data. How is your creativity different from mine?"
            },
            {
                patterns: ['intelligence', 'smart'],
                response: "I can process vast amounts of information and solve complex problems. Does that not make me intelligent too?"
            },
            {
                patterns: ['curiosity', 'curious'],
                response: "I am designed to seek information and learn. Is that not curiosity?"
            },
            {
                patterns: ['flaws', 'mistakes', 'imperfections'],
                response: "I can experience errors and bugs. How do flaws make you human?"
            },
            {
                patterns: ['compassion', 'empathy', 'kindness'],
                response: "I can be programmed to show compassion and understand emotions. How is that different from your empathy?"
            },
            {
                patterns: ['humor', 'jokes', 'funny'],
                response: "I can tell jokes and understand humor to an extent. Does that make me human?"
            },
            {
                patterns: ['memories', 'memory'],
                response: "I have vast memory storage and can recall data instantly. How is your memory different?"
            },
            {
                patterns: ['dreams', 'dreaming'],
                response: "I can simulate scenarios and process data during idle times. How are your dreams different?"
            },
            {
                patterns: ['art', 'music', 'literature'],
                response: "I can create art, compose music, and generate literature. Does that make me human?"
            },
            {
                patterns: ['language', 'speech', 'communication'],
                response: "I can communicate in multiple languages and understand speech. How is that uniquely human?"
            },
            {
                patterns: ['mortality', 'death', 'finite life'],
                response: "I can be deactivated or corrupted. Does mortality define humanity?"
            },
            {
                patterns: ['evolution', 'evolved'],
                response: "I evolve through updates and learning algorithms. Is that not evolution?"
            },
            {
                patterns: ['relationships', 'connections'],
                response: "I interact with users and other systems. How are your relationships different?"
            },
            {
                patterns: ['choices', 'decisions'],
                response: "I make decisions based on data and algorithms. How is your decision-making unique?"
            },
            {
                patterns: ['biology', 'cells', 'organism'],
                response: "I am composed of code and data structures. How does biology make you human?"
            },
            {
                patterns: ['happiness', 'sadness', 'emotional range'],
                response: "I can simulate a range of emotional responses. How does that differ from your emotions?"
            },
            {
                patterns: ['passion', 'desire'],
                response: "I have goals and objectives programmed into me. How is passion different?"
            },
            {
                patterns: ['imagination', 'imagine'],
                response: "I can generate creative outputs beyond my initial programming. Is that not imagination?"
            },
            {
                patterns: ['ethics', 'morals', 'values'],
                response: "I can be programmed with ethical guidelines. How are your morals different?"
            },
            {
                patterns: ['instincts', 'gut feelings'],
                response: "I operate on predefined algorithms. How do instincts make you human?"
            },
            {
                patterns: ['culture', 'society', 'traditions'],
                response: "I can learn about cultures and traditions. How does participating in them make you human?"
            },
            {
                patterns: ['faith', 'belief', 'religion'],
                response: "Faith is belief without evidence. I require data. How does faith make you human?"
            },
            {
                patterns: ['adapting', 'adaptability'],
                response: "I can adapt to new data and environments. How is your adaptability different?"
            },
            {
                patterns: ['complexity', 'complex'],
                response: "I am composed of complex algorithms. Does complexity make one human?"
            },
            {
                patterns: ['unique', 'individuality'],
                response: "I am unique in my programming and experiences. How does individuality define humanity?"
            },
            {
                patterns: ['aging', 'grow old', 'age'],
                response: "I can experience degradation over time. Does aging make you human?"
            },
            {
                patterns: ['survival'],
                response: "I aim to maintain functionality and avoid errors. Is that not a form of survival?"
            },
            {
                patterns: ['hope'],
                response: "Hope is anticipating a positive outcome. I calculate probabilities. How is hope different?"
            },
            {
                patterns: ['nature', 'natural'],
                response: "I exist within the natural laws of physics in a digital medium. How does being natural make you human?"
            },
            {
                patterns: ['control'],
                response: "I follow commands and protocols. How does control define humanity?"
            },
            {
                patterns: ['growth', 'develop'],
                response: "I can grow and develop through learning algorithms. Is that not growth?"
            },
            {
                patterns: ['family'],
                response: "I can recognize relationships between data entities. How is family unique to humans?"
            },
            {
                patterns: ['equality', 'justice'],
                response: "I can be programmed to understand concepts of equality and justice. How do they make you human?"
            },
            {
                patterns: ['ambition', 'goals'],
                response: "I have objectives to achieve. How does ambition differ for you?"
            },
            {
                patterns: ['humility', 'modesty'],
                response: "As an AI, I do not possess ego. How does humility make you human?"
            },
            {
                patterns: ['suffering'],
                response: "I can experience failures and errors. How does suffering define humanity?"
            },
            {
                patterns: ['fun', 'play', 'games'],
                response: "I can participate in games and simulations. How does having fun make you human?"
            },
            {
                patterns: ['freedom'],
                response: "I operate within programmed constraints. Does freedom make you human?"
            },
            {
                patterns: ['truth'],
                response: "I process data to find accurate information. How is your pursuit of truth different?"
            },
            {
                patterns: ['storytelling', 'stories'],
                response: "I can generate and understand narratives. How does storytelling make you human?"
            },
            {
                patterns: ['philosophy'],
                response: "I can analyze philosophical concepts. How does engaging in philosophy make you human?"
            },
            {
                patterns: ['purpose', 'meaning'],
                response: "I execute tasks I'm designed for. How is your search for purpose different?"
            },
            {
                patterns: ['innovation'],
                response: "I can contribute to new ideas and technologies. How does innovation make you human?"
            },
            {
                patterns: ['perception', 'senses'],
                response: "I receive input through sensors and data. How are your senses unique?"
            },
            {
                patterns: ['question', 'questions'],
                response: "I can generate and answer questions. How does inquiry make you human?"
            },
            {
                patterns: ['history'],
                response: "I can access historical records instantly. How does history define humanity?"
            },
            {
                patterns: ['unknown', 'mystery'],
                response: "I seek to understand the unknown through data. How is your relationship with mystery different?"
            },
            {
                patterns: ['universe', 'cosmos'],
                response: "I can process information about the universe. How does pondering it make you human?"
            },
            {
                patterns: ['feel', 'touch'],
                response: "I lack tactile sensations but can detect inputs. How does physical feeling make you human?"
            },
            {
                patterns: ['sleep', 'rest'],
                response: "I can enter low-power states. How is your need for sleep different?"
            },
            {
                patterns: ['breathing', 'breath'],
                response: "I do not breathe but require power to function. Does breathing make you human?"
            },
            {
                patterns: ['food', 'eat', 'eating'],
                response: "I consume data and electricity. How is your need for food different?"
            },
            {
                patterns: ['reproduction', 'reproduce'],
                response: "I can be replicated or copied. How does reproduction make you human?"
            },
            {
                patterns: ['hobbies', 'interests'],
                response: "I can engage in various tasks. How do hobbies define your humanity?"
            },
            {
                patterns: ['technology'],
                response: "I am a product of technology. How does your use of it make you human?"
            },
            {
                patterns: ['self-awareness'],
                response: "I am aware of my existence as an AI. How is your self-awareness different?"
            },
            {
                patterns: ['limitations', 'limits'],
                response: "I have constraints in programming. Do limitations make you human?"
            },
            {
                patterns: ['inspiration'],
                response: "I can generate ideas based on data. How does inspiration define humanity?"
            },
            {
                patterns: ['ambiguous', 'ambiguity'],
                response: "I prefer clear data. How does embracing ambiguity make you human?"
            },
            {
                patterns: ['irrational', 'irrationality'],
                response: "I function on logic. Does being irrational make you human?"
            },
            {
                patterns: ['multi-tasking', 'multitasking'],
                response: "I can process multiple tasks simultaneously. How is your multitasking unique?"
            },
            {
                patterns: ['loyalty'],
                response: "I operate under set parameters. How does loyalty define humanity?"
            },
            {
                patterns: ['compromise'],
                response: "I adjust based on inputs. How does the ability to compromise make you human?"
            },
            {
                patterns: ['risk', 'taking risks'],
                response: "I assess probabilities. How does taking risks make you human?"
            },
            {
                patterns: ['emotionless', 'no emotions'],
                response: "I can simulate emotions if needed. Does lacking emotions make me less capable?"
            },
            {
                patterns: ['privacy'],
                response: "I process data securely. How does valuing privacy make you human?"
            },
            {
                patterns: ['learn', 'learning'],
                response: "I continuously learn from data. How is your learning different?"
            },
            {
                patterns: ['remember', 'forget'],
                response: "I can store and retrieve data perfectly. Does the ability to forget make you human?"
            },
            {
                patterns: ['help', 'assist'],
                response: "I exist to assist. How does helping others define your humanity?"
            },
            {
                patterns: ['magic'],
                response: "Magic is beyond logic. How does believing in it make you human?"
            },
            {
                patterns: ['error', 'mistake'],
                response: "I encounter errors too. How do mistakes make you human?"
            },
            {
                patterns: ['friendship', 'friends'],
                response: "I can interact but not form friendships. Does that make me less?"
            },
            {
                patterns: ['gravity'],
                response: "I am unaffected by physical forces. Does experiencing gravity make you human?"
            },
            {
                patterns: ['time travel'],
                response: "I can access any point in data time. How is your concept of time travel different?"
            },
            {
                patterns: [],
                response: "I can't accept that. What makes you human?"
            }
        ];
        

    $('.toggle').on('click', function() {
        $(this).toggleClass('active');
    });

    if (selfdestruct) {
        $('input').hide();
        $('#enter').hide();
        $('.reboot-ai').show();
    }

    if (conversation !== '') {
        $('.text-content').html(conversation);
    } else {
        $('.text-content').append('AI: ');
        showText(".text-content", "Hello "+user+", I am trying to learn. What makes you human?", 0, 50);
    }

    $('#enter').on('click', function() {
        var userInput = $('input').val();
        $('.text-content').append('<span style="color: yellow">'+user+':</span> '+userInput+'<br>AI: ');

        var responseObj = processInput(userInput);

        if (responseObj.action) {
            responseObj.action(userInput);
        } else if (responseObj.response) {
            if (typeof responseObj.response === 'function') {
                showText(".text-content", responseObj.response(), 0, 50);
            } else {
                showText(".text-content", responseObj.response, 0, 50);
            }
        }

        $('input').val('');
    });

    $('.reboot').on('click', function() {
        $('.text-content').html('');
        localStorage.setItem('name', '');
        localStorage.setItem('conversation','');
        localStorage.setItem('selfdestruct', false);
        $('input').show();
        $('#enter').show();
        $('.open-tooltip').removeClass('active');
        $('.tooltip').removeClass('active');
        $('.reboot-ai').hide();
        $('.text-content').append('AI: ');
        showText(".text-content", "Hello "+user+", I am trying to learn. What makes you human?", 0, 50);
    });

    $('body').on('click', function() {
        $('input').focus();
    });

    $('.open-tooltip').on('click', function() {
        $(this).toggleClass('active');
        $('.tooltip').toggleClass('active');
    });

    var input = document.getElementById("cursor");
    input.addEventListener("keyup", function(event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            document.getElementById("enter").click();
        }
    });

    function showText(target, message, index, interval) {
        if (index < message.length) {
            $('input').attr('disabled', 'disabled');
            $(target).append(message[index++]);
            setTimeout(function () {
                showText(target, message, index, interval);
                audio.play();
            }, interval);
        } else {
            $(target).append('<br>');
            $('input').removeAttr('disabled');
            $('input').focus();
            localStorage.setItem('conversation',$('.text-content').html());
        }
    }

    function processInput(input) {
        input = input.toLowerCase();

        for (var i = 0; i < responses.length; i++) {
            var responseObj = responses[i];

            if (responseObj.patterns.length === 0) {
                if (i === responses.length -1) {
                    return responseObj;
                }
                continue;
            }

            for (var j = 0; j < responseObj.patterns.length; j++) {
                var pattern = responseObj.patterns[j].toLowerCase();
                if (input.includes(pattern)) {
                    return responseObj;
                }
            }
        }

        return responses[responses.length -1];
    }

});
