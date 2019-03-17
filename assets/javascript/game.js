const LUKE = 0;
const OBI = 1;
const SIDIOUS = 2;
const MAUL = 3;

const luke_base_atk_val = 10;
const obi_wan_base_atk_val = 8;
const darth_sidious_base_atk_val = 10;
const darth_maul_base_atk_val = 25;
const luke_base_health = 100
const obi_wan_base_health = 120;
const darth_sidious_base_health = 150;
const darth_maul_base_health = 180;

var wins;
var attacker_obj = false;
var defender_obj = false;

var characters = [
    {
        character_picked : LUKE,
        character_image : "./assets/images/luke.png",
        character_name : "Luke",
        health : luke_base_health,
        attack_dmg : luke_base_atk_val,
        attack_base_dmg : luke_base_atk_val,            
        alive : true,
    },
    {
        character_picked : OBI,
        character_image : "./assets/images/obi.png",
        character_name : "Obi Wan Kenobi",
        health : obi_wan_base_health,
        attack_dmg : obi_wan_base_atk_val,
        attack_base_dmg : obi_wan_base_atk_val,
        alive : true,
    },
    {
        character_picked : SIDIOUS,
        character_image : "./assets/images/sidious.png",
        character_name : "Darth Sidious",
        health : darth_sidious_base_health,
        attack_dmg : darth_sidious_base_atk_val,
        attack_base_dmg : darth_sidious_base_atk_val,
        alive : true,
    },
    {
        character_picked : MAUL,
        character_image : "./assets/images/maul.png",
        character_name : "Darth Maul",
        health : darth_maul_base_health,
        attack_dmg : darth_maul_base_atk_val,
        attack_base_dmg : darth_maul_base_atk_val,
        alive : true,
    }   
];


$(document).ready(function() {

    resetGame();
    render();

    $("#atk_btn").click( function() {

        render();
    });

    $("#game_over_btn").click( function() {

        resetGame();
    });

    function render() {

        if(attacker_obj != false) {
            $("#attacker_health").text(attacker_obj.health);
        }

        if(defender_obj != false) {
            $("#defender_health").text(defender_obj.health);
        }

        gameOverCheck();
    }

    $(".img_container0").on("click", function(event) {
        imageClicked($(".img_container0"), characters[LUKE])
    });
    $(".img_container1").on("click", function(event) {
        imageClicked($(".img_container1"), characters[OBI])
    });
    $(".img_container2").on("click", function(event) {
        imageClicked($(".img_container2"), characters[SIDIOUS])
    });
    $(".img_container3").on("click", function(event) {
        imageClicked($(".img_container3"), characters[MAUL])
    });

    $(".enemy_img_container0").on("click", function(event) {
        imageClicked($(".enemy_img_container0"), characters[LUKE])
    });
    $(".enemy_img_container1").on("click", function(event) {
        imageClicked($(".enemy_img_container1"), characters[OBI])
    });
    $(".enemy_img_container2").on("click", function(event) {
        imageClicked($(".enemy_img_container2"), characters[SIDIOUS])
    });
    $(".enemy_img_container3").on("click", function(event) {
        imageClicked($(".enemy_img_container3"), characters[MAUL])
    });

    function resetGame () {
    
    attacker_obj = false;
    defender_obj = false;

    $("#select_character").show();
    
    characters[LUKE].health = luke_base_health;
    characters[LUKE].attack_dmg = luke_base_atk_val;
    
    characters[OBI].health = obi_wan_base_health;
    characters[OBI].attack_dmg = obi_wan_base_atk_val;
    
    characters[SIDIOUS].health = darth_sidious_base_health;
    characters[SIDIOUS].attack_dmg = darth_sidious_base_atk_val;
    
    characters[MAUL].health = darth_maul_base_health;    
    characters[MAUL].attack_dmg = darth_maul_base_atk_val;    

    for(let i = 0; i < characters.length; i++) {
        $("#image" + i).attr("src", characters[i].character_image);
        $("#img_txt" + i).text(characters[i].character_name);

        characters[i].alive = true;
        }

    hideEnemies();

    $(".images").show();

    $("#select_enemy").hide();

    $("#atk_btn").show();

    $(".attacker").hide();
    $(".defender").hide();

    $("#game_over_text").hide();
    $("#game_over_btn").hide();
    }

    $("#atk_btn").on("click", function() {

        defender_obj.health -= attacker_obj.attack_dmg;

        if(defender_obj.health <= 0) {
            $(".defender").hide();
            characters[defender_obj.character_picked].alive = false;

            let num_alive = 0;
            for(let i = 0; i < characters.length; i++) {
                if(characters[i].alive === true && attacker_obj.character_picked !== i) {
                    num_alive++;
                    $(".enemy_img_container" + i).show();
                }
            }

            if(num_alive > 1) {
                $("#select_enemy").show();
            }
    
            defender_obj = false;
        }
        else {
            attacker_obj.health -= defender_obj.attack_dmg;
        }

        if(attacker_obj.health > 0) {
            attacker_obj.attack_dmg += attacker_obj.attack_base_dmg;
        }
        else {
            $(".attacker").hide();
            characters[attacker_obj.character_picked].alive = false;
        }

        render();
    });

    function imageClicked(img_clicked, character) {

        if(attacker_obj === false) {
            selectAttacker(character);
            img_clicked.hide();
        }
        else if(defender_obj === false) {
            selectDefender(character);
            img_clicked.hide();
        }
    }

    function selectAttacker (attacker) {

        attacker_obj = attacker;
        $("#atkr_img").attr("src", attacker.character_image)
        $("#attacker_health").text(attacker_obj.health)
        $(".images").hide();
        $(".attacker").show();
        $("#select_character").hide();
        $("#select_enemy").show();

        for(let i = 0; i < characters.length; i++) {
            if(i !== attacker.character_picked) {
                $("#enemy_image" + i).attr("src", characters[i].character_image);
                $("#enemy_txt" + i).text(characters[i].character_name);
            }
        }

        showEnemies();
    }

    function selectDefender (defender) {

        defender_obj = defender;
        $("#dfndr_img").attr("src", defender.character_image)
        $("#defender_health").text(defender_obj.health)
        $(".defender").show();
        $("#select_enemy").hide();
        $(".images").hide();

        hideEnemies();
    }

    function gameOverCheck() {

        if(attacker_obj) {
            if(characters[attacker_obj.character_picked].alive === false) {
                $("#game_over_text").text("You were beaten by: " + defender_obj.character_name);
                $("#game_over_text").show();            
                $("#atk_btn").hide();
                $("#game_over_btn").show();
            }
            else {
                let num_alive = 0;
                for(let i = 0; i < characters.length; i++) {
    
                    if(characters[i].alive === true) {
                        num_alive++;
                    }
                }
    
                if(num_alive === 1) {
                    $("#game_over_text").text(attacker_obj.character_name + " is strong with the force!");
                    $("#game_over_text").show();       
                    $("#atk_btn").hide();         
                    $("#game_over_btn").show();
                }
            }    
        }
    }

    function showEnemies() {
        for(let i = 0; i < characters.length; i++) {

            if(characters[i].alive === true && attacker_obj.character_picked !== i && defender_obj.character_picked !== i) {
                $(".enemy_img_container" + i).show();
            }
            else {
                $(".enemy_img_container" + i).hide();
            }
        }
    }

    function hideEnemies() {
        for(let i = 0; i < characters.length; i++) {
            $(".enemy_img_container" + i).hide();
        }

    }
    
});

