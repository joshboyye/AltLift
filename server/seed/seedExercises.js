
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Exercise from '../models/Exercise.js'

dotenv.config()

// Helper function for creating exercise records
function add(name, pattern, primary, secondary, equipment, level, kind, description, cue, unilateral = false) {
  return {
    name,
    identifier: name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
    pattern: pattern,
    primaryMuscles: primary,
    secondaryMuscles: secondary,
    equipment,
    level,
    kind,
    description,
    cue,
    isCompound: pattern !== 'Isolation',
    isUnilateral: unilateral
  }
}

const exercises = [

  // HORIZONTAL PUSH (8)
  add('Barbell Bench Press', 'Horizontal push', ['chest'], ['front delts', 'triceps'], ['barbell', 'bench'], 'Intermediate', 'bench', 'A compound pressing exercise that primarily targets the chest, with assistance from the front delts and triceps.', 'Keep your feet planted and lower the bar under control.'),
  add('Dumbbell Bench Press', 'Horizontal push', ['chest'], ['front delts', 'triceps'], ['dumbbells', 'bench'], 'Beginner', 'bench', 'A chest pressing exercise that allows each arm to move independently.', 'Keep your wrists stacked over your elbows.'),
  add('Incline Barbell Bench Press', 'Horizontal push', ['chest'], ['front delts', 'triceps'], ['barbell', 'bench'], 'Intermediate', 'bench', 'An inclined pressing movement emphasizing the upper chest.', 'Keep your shoulder blades retracted against the bench.'),
  add('Incline Dumbbell Press', 'Horizontal push', ['chest'], ['front delts', 'triceps'], ['dumbbells', 'bench'], 'Beginner', 'bench', 'An inclined dumbbell press that emphasizes the upper chest while allowing independent arm movement.', 'Lower the dumbbells slowly and maintain control.'),
  add('Decline Bench Press', 'Horizontal push', ['chest'], ['triceps'], ['barbell', 'bench'], 'Intermediate', 'bench', 'A decline pressing movement that emphasizes the lower portion of the chest.', 'Keep your shoulders stable and avoid bouncing the bar.'),
  add('Push-Up', 'Horizontal push', ['chest'], ['front delts', 'triceps'], ['bodyweight'], 'Beginner', 'pushup', 'A bodyweight pressing exercise that trains the chest, shoulders, and triceps.', 'Maintain a straight line from your head to your heels.'),
  add('Machine Chest Press', 'Horizontal push', ['chest'], ['front delts', 'triceps'], ['machine'], 'Beginner', 'machine', 'A guided pressing movement that targets the chest while reducing stabilization demands.', 'Adjust the seat so the handles align with your mid-chest.'),
  add('Cable Chest Press', 'Horizontal push', ['chest'], ['front delts', 'triceps'], ['cable'], 'Intermediate', 'cable', 'A standing chest press that uses cable resistance to maintain tension throughout the movement.', 'Brace your core and avoid leaning forward.'),

  // VERTICAL PUSH (6)
  add('Barbell Overhead Press', 'Vertical push', ['front delts', 'side delts'], ['triceps'], ['barbell'], 'Intermediate', 'press', 'A compound overhead pressing exercise targeting the shoulders and triceps.', 'Brace your core and keep the bar moving in a controlled path.'),
  add('Dumbbell Shoulder Press', 'Vertical push', ['front delts'], ['side delts', 'triceps'], ['dumbbells'], 'Intermediate', 'press', 'An overhead dumbbell press primarily targeting the front delts.', 'Keep your ribs stacked over your hips.'),
  add('Arnold Press', 'Vertical push', ['front delts'], ['side delts', 'triceps'], ['dumbbells'], 'Intermediate', 'press', 'A rotating dumbbell shoulder press that emphasizes the front delts.', 'Rotate the dumbbells smoothly without forcing your shoulders.'),
  add('Machine Shoulder Press', 'Vertical push', ['front delts'], ['side delts', 'triceps'], ['machine'], 'Beginner', 'machine', 'A guided overhead press that trains the shoulders and triceps.', 'Adjust the seat so the handles start around shoulder height.'),
  add('Landmine Press', 'Vertical push', ['front delts'], ['chest', 'triceps'], ['barbell'], 'Intermediate', 'press', 'A diagonal pressing movement using a landmine setup to train the shoulders and upper chest.', 'Press forward and upward without excessively arching your back.'),
  add('Pike Push-Up', 'Vertical push', ['front delts'], ['triceps'], ['bodyweight'], 'Intermediate', 'pushup', 'A bodyweight vertical pressing variation that places greater emphasis on the shoulders.', 'Keep your hips elevated and lower your head between your hands.'),

  // HORIZONTAL PULL (8)
  add('Barbell Bent-Over Row', 'Horizontal pull', ['upper back', 'lats'], ['biceps', 'rear delts'], ['barbell'], 'Intermediate', 'row', 'A compound rowing movement that targets the back while requiring trunk stabilization.', 'Maintain your hip hinge and pull the bar toward your lower ribs.'),
  add('One-Arm Dumbbell Row', 'Horizontal pull', ['lats'], ['upper back', 'biceps'], ['dumbbells'], 'Beginner', 'row', 'A unilateral rowing exercise that emphasizes the lats and allows each side to work independently.', 'Pull your elbow toward your hip without twisting your torso.', true),
  add('Chest-Supported Dumbbell Row', 'Horizontal pull', ['upper back'], ['lats', 'biceps'], ['dumbbells', 'bench'], 'Beginner', 'row', 'A supported rowing exercise that reduces lower-back stabilization demands.', 'Keep your chest against the bench throughout the movement.'),
  add('Seated Cable Row', 'Horizontal pull', ['upper back'], ['lats', 'biceps'], ['cable'], 'Beginner', 'row', 'A cable rowing exercise that targets the upper back and lats.', 'Keep your torso steady and pull the handle toward your ribs.'),
  add('Machine Row', 'Horizontal pull', ['upper back'], ['lats', 'biceps'], ['machine'], 'Beginner', 'machine', 'A supported rowing movement that trains the upper back and lats.', 'Keep your chest supported and avoid using momentum.'),
  add('Inverted Row', 'Horizontal pull', ['upper back'], ['biceps', 'rear delts'], ['bodyweight'], 'Intermediate', 'row', 'A bodyweight horizontal pulling exercise performed beneath a fixed bar.', 'Keep your body straight and pull your chest toward the bar.'),
  add('Single-Arm Cable Row', 'Horizontal pull', ['lats'], ['upper back', 'biceps'], ['cable'], 'Beginner', 'row', 'A unilateral cable rowing movement that trains the lats and upper back.', 'Keep your torso stable as you pull your elbow backward.', true),
  add('T-Bar Row', 'Horizontal pull', ['upper back'], ['lats', 'biceps'], ['barbell', 'machine'], 'Intermediate', 'row', 'A compound rowing exercise that emphasizes the upper back and lats.', 'Keep your torso braced and avoid jerking the weight.'),

  // VERTICAL PULL (6)
  add('Pull-Up', 'Vertical pull', ['lats'], ['biceps', 'upper back'], ['bodyweight', 'pull up bar'], 'Advanced', 'pullup', 'A bodyweight vertical pulling exercise that develops the lats and upper back.', 'Start from a controlled hang and pull your chest toward the bar.'),
  add('Chin-Up', 'Vertical pull', ['lats', 'biceps'], ['upper back'], ['bodyweight', 'pull up bar'], 'Intermediate', 'pullup', 'A vertical pulling exercise using an underhand grip to emphasize the lats and biceps.', 'Avoid swinging and lower yourself under control.'),
  add('Lat Pulldown', 'Vertical pull', ['lats'], ['biceps', 'upper back'], ['cable'], 'Beginner', 'pulldown', 'A cable-based vertical pull that targets the lats and supporting back muscles.', 'Pull the bar toward your upper chest without leaning excessively.'),
  add('Close-Grip Lat Pulldown', 'Vertical pull', ['lats'], ['biceps', 'upper back'], ['cable'], 'Beginner', 'pulldown', 'A close-grip pulldown variation that trains the lats through a vertical pulling motion.', 'Keep your elbows close to your sides as you pull.'),
  add('Assisted Pull-Up', 'Vertical pull', ['lats'], ['biceps', 'upper back'], ['machine'], 'Beginner', 'machine', 'An assisted vertical pulling exercise that reduces the amount of bodyweight being lifted.', 'Use assistance that allows controlled full-range repetitions.'),
  add('Straight-Arm Pulldown', 'Vertical pull', ['lats'], ['triceps'], ['cable'], 'Beginner', 'pulldown', 'A lat-focused cable exercise that uses shoulder extension with minimal elbow movement.', 'Keep your arms nearly straight and pull toward your thighs.'),

  // SQUAT (8)
  add('Barbell Back Squat', 'Squat', ['quads', 'glutes'], ['hamstrings', 'adductors'], ['barbell'], 'Intermediate', 'squat', 'A compound lower-body exercise that trains the quads and glutes.', 'Brace before each repetition and use a comfortable depth.'),
  add('Front Squat', 'Squat', ['quads'], ['glutes', 'abs'], ['barbell'], 'Advanced', 'squat', 'A squat variation with the bar held in front of the body, emphasizing the quads and trunk stability.', 'Keep your elbows elevated and torso upright.'),
  add('Goblet Squat', 'Squat', ['quads', 'glutes'], ['abs'], ['dumbbells'], 'Beginner', 'squat', 'A squat variation performed with a weight held in front of the chest.', 'Keep the weight close to your chest as you squat.'),
  add('Hack Squat', 'Squat', ['quads'], ['glutes'], ['machine'], 'Beginner', 'machine', 'A machine-based squat variation that emphasizes the quadriceps.', 'Keep your back supported and lower through a controlled range.'),
  add('Leg Press', 'Squat', ['quads', 'glutes'], ['hamstrings'], ['machine'], 'Beginner', 'machine', 'A supported lower-body pressing movement that trains the quads and glutes.', 'Avoid locking your knees or allowing your hips to lift.'),
  add('Box Squat', 'Squat', ['quads', 'glutes'], ['hamstrings'], ['barbell'], 'Intermediate', 'squat', 'A squat variation that uses a box to establish a consistent depth.', 'Sit back under control and avoid collapsing onto the box.'),
  add('Smith Machine Squat', 'Squat', ['quads', 'glutes'], ['hamstrings'], ['machine'], 'Beginner', 'machine', 'A guided squat variation performed using a Smith machine.', 'Position your feet comfortably and maintain controlled depth.'),
  add('Heels-Elevated Dumbbell Squat', 'Squat', ['quads'], ['glutes'], ['dumbbells'], 'Beginner', 'squat', 'A squat variation using elevated heels to allow greater forward knee travel and emphasize the quads.', 'Keep your torso controlled and knees tracking over your toes.'),

  // HINGE (8)
  add('Conventional Deadlift', 'Hinge', ['hamstrings', 'glutes', 'lower back'], ['quads', 'traps'], ['barbell'], 'Advanced', 'deadlift', 'A compound hip-hinge movement that trains the posterior chain and requires full-body bracing.', 'Keep the bar close to your body and brace before lifting.'),
  add('Sumo Deadlift', 'Hinge', ['glutes', 'adductors'], ['hamstrings', 'quads'], ['barbell'], 'Advanced', 'deadlift', 'A wide-stance deadlift variation emphasizing the glutes and adductors.', 'Keep your chest up and push through the floor.'),
  add('Barbell Romanian Deadlift', 'Hinge', ['hamstrings'], ['glutes', 'lower back'], ['barbell'], 'Intermediate', 'deadlift', 'A hip-hinge exercise that emphasizes the hamstrings and glutes through a controlled lowering phase.', 'Push your hips backward while keeping the bar close to your legs.'),
  add('Dumbbell Romanian Deadlift', 'Hinge', ['hamstrings'], ['glutes', 'lower back'], ['dumbbells'], 'Beginner', 'deadlift', 'A dumbbell hip-hinge exercise targeting the hamstrings and glutes.', 'Maintain a slight knee bend and push your hips backward.'),
  add('Good Morning', 'Hinge', ['hamstrings', 'lower back'], ['glutes'], ['barbell'], 'Advanced', 'hinge', 'A loaded hip-hinge exercise that develops the posterior chain and spinal erectors.', 'Keep your back neutral and hinge at your hips.'),
  add('Barbell Hip Thrust', 'Hinge', ['glutes'], ['hamstrings'], ['barbell', 'bench'], 'Intermediate', 'hip-thrust', 'A loaded hip-extension exercise that emphasizes the glutes.', 'Finish by squeezing your glutes without overextending your lower back.'),
  add('Glute Bridge', 'Hinge', ['glutes'], ['hamstrings'], ['bodyweight'], 'Beginner', 'hinge', 'A bodyweight hip-extension exercise that targets the glutes.', 'Drive through your heels and avoid arching your lower back.'),
  add('Cable Pull-Through', 'Hinge', ['glutes', 'hamstrings'], ['lower back'], ['cable'], 'Beginner', 'hinge', 'A cable hip-hinge movement that trains the glutes and hamstrings.', 'Push your hips backward and stand by driving them forward.'),

  // LUNGE (8)
  add('Reverse Lunge', 'Lunge', ['quads', 'glutes'], ['hamstrings'], ['bodyweight'], 'Beginner', 'lunge', 'A single-leg exercise performed by stepping backward into a lunge.', 'Step back far enough to maintain balance and control.', true),
  add('Forward Lunge', 'Lunge', ['quads'], ['glutes', 'hamstrings'], ['bodyweight'], 'Intermediate', 'lunge', 'A unilateral lower-body exercise performed by stepping forward into a lunge.', 'Keep your front foot planted and control your descent.', true),
  add('Walking Lunge', 'Lunge', ['quads', 'glutes'], ['hamstrings'], ['dumbbells'], 'Intermediate', 'lunge', 'A moving lunge variation that trains the quads and glutes on alternating legs.', 'Take controlled steps and keep your torso upright.', true),
  add('Bulgarian Split Squat', 'Lunge', ['quads', 'glutes'], ['hamstrings'], ['dumbbells'], 'Intermediate', 'lunge', 'A unilateral squat variation with the rear foot elevated to increase the challenge on the front leg.', 'Keep your front foot firmly planted and lower under control.', true),
  add('Dumbbell Step-Up', 'Lunge', ['quads', 'glutes'], ['hamstrings'], ['dumbbells', 'bench'], 'Intermediate', 'lunge', 'A unilateral exercise that involves stepping onto an elevated platform while holding dumbbells.', 'Drive through the elevated foot without pushing off excessively with the trailing leg.', true),
  add('Lateral Lunge', 'Lunge', ['quads', 'adductors'], ['glutes'], ['bodyweight'], 'Beginner', 'lunge', 'A side-to-side lunge variation that trains the quads and inner thighs.', 'Shift your hips toward the bent leg while keeping the opposite leg extended.', true),
  add('Curtsy Lunge', 'Lunge', ['glutes'], ['quads', 'adductors'], ['dumbbells'], 'Intermediate', 'lunge', 'A diagonal lunge variation that emphasizes the glutes and challenges single-leg stability.', 'Step diagonally behind yourself and keep your front knee controlled.', true),
  add('Split Squat', 'Lunge', ['quads', 'glutes'], ['hamstrings'], ['bodyweight'], 'Beginner', 'lunge', 'A stationary single-leg squat variation that develops the quads and glutes.', 'Maintain your stance and lower your back knee toward the floor.', true),

  // CARRY (4)
  add('Farmer Carry', 'Carry', ['forearms', 'traps'], ['abs', 'glutes'], ['dumbbells'], 'Beginner', 'carry', 'A loaded carry that challenges grip strength, traps, and full-body stability.', 'Walk tall with your shoulders stable and core braced.'),
  add('Suitcase Carry', 'Carry', ['obliques', 'forearms'], ['traps', 'abs'], ['dumbbells'], 'Intermediate', 'carry', 'A unilateral loaded carry that challenges grip strength and resistance to lateral bending.', 'Keep your torso upright without leaning toward the weight.', true),
  add('Front Rack Carry', 'Carry', ['abs', 'upper back'], ['forearms', 'quads'], ['kettlebell'], 'Intermediate', 'carry', 'A loaded carry with the weight held near shoulder height, challenging core and upper-back stability.', 'Keep your elbows positioned and torso upright.'),
  add('Overhead Carry', 'Carry', ['front delts', 'abs'], ['triceps', 'traps'], ['dumbbells'], 'Advanced', 'carry', 'A loaded carry performed with weights held overhead to challenge shoulder stability and core strength.', 'Keep your arms locked out and ribs stacked over your hips.'),

  // CORE (12)
  add('Plank', 'Core', ['abs'], ['obliques'], ['bodyweight'], 'Beginner', 'core', 'A static core exercise that trains abdominal bracing and trunk stability.', 'Keep your hips level and avoid letting your lower back sag.'),
  add('Side Plank', 'Core', ['obliques'], ['abs'], ['bodyweight'], 'Beginner', 'core', 'A static core exercise emphasizing the obliques and lateral trunk stability.', 'Keep your hips elevated and your body in a straight line.', true),
  add('Dead Bug', 'Core', ['abs'], ['obliques'], ['bodyweight'], 'Beginner', 'core', 'A controlled core exercise that challenges trunk stability while moving opposite limbs.', 'Keep your lower back gently pressed toward the floor.'),
  add('Bird Dog', 'Core', ['abs', 'lower back'], ['glutes'], ['bodyweight'], 'Beginner', 'core', 'A stability exercise involving opposite arm and leg extensions.', 'Avoid rotating your hips as you extend your limbs.'),
  add('Ab Wheel Rollout', 'Core', ['abs'], ['lats', 'front delts'], ['ab wheel'], 'Advanced', 'core', 'A challenging anti-extension exercise that trains the abdominal muscles through a rolling movement.', 'Brace your abs and avoid allowing your lower back to arch.'),
  add('Hanging Knee Raise', 'Core', ['abs'], ['hip flexors'], ['pull up bar'], 'Intermediate', 'core', 'A hanging abdominal exercise performed by raising the knees toward the torso.', 'Avoid swinging and curl your pelvis upward.'),
  add('Hanging Leg Raise', 'Core', ['abs'], ['hip flexors'], ['pull up bar'], 'Advanced', 'core', 'A challenging hanging exercise that raises the legs while demanding abdominal control.', 'Keep your body still and avoid using momentum.'),
  add('Cable Crunch', 'Core', ['abs'], [], ['cable'], 'Beginner', 'core', 'A weighted abdominal exercise using cable resistance to train spinal flexion.', 'Curl your torso downward rather than pulling with your arms.'),
  add('Reverse Crunch', 'Core', ['abs'], ['hip flexors'], ['bodyweight'], 'Beginner', 'core', 'A bodyweight abdominal exercise that emphasizes curling the pelvis toward the torso.', 'Lift your hips using your abs instead of swinging your legs.'),
  add('Pallof Press', 'Core', ['obliques'], ['abs'], ['cable'], 'Beginner', 'core', 'An anti-rotation exercise that challenges the core to resist rotational force.', 'Keep your hips and shoulders square as you extend your arms.'),
  add('Russian Twist', 'Core', ['obliques'], ['abs'], ['bodyweight'], 'Intermediate', 'core', 'A rotational core exercise that targets the obliques.', 'Rotate your torso under control without excessively rounding your back.'),
  add('Back Extension', 'Core', ['lower back'], ['glutes', 'hamstrings'], ['machine'], 'Beginner', 'core', 'A trunk extension exercise that develops the lower back and posterior chain.', 'Extend your torso until it aligns with your legs without hyperextending.'),

  // ISOLATION (12)
  add('Dumbbell Bicep Curl', 'Isolation', ['biceps'], ['forearms'], ['dumbbells'], 'Beginner', 'curl', 'An isolation exercise that targets the biceps through elbow flexion.', 'Keep your elbows close to your sides and avoid swinging.'),
  add('Hammer Curl', 'Isolation', ['biceps', 'forearms'], [], ['dumbbells'], 'Beginner', 'curl', 'A neutral-grip curl that trains the biceps and forearm muscles.', 'Keep your palms facing each other throughout the movement.'),
  add('EZ-Bar Curl', 'Isolation', ['biceps'], ['forearms'], ['ez bar'], 'Beginner', 'curl', 'A biceps curl performed with an angled bar to provide a comfortable grip.', 'Keep your upper arms still while curling the bar.'),
  add('Preacher Curl', 'Isolation', ['biceps'], ['forearms'], ['ez bar', 'bench'], 'Intermediate', 'curl', 'A supported biceps curl that limits upper-arm movement during the exercise.', 'Avoid fully locking out your elbows at the bottom.'),
  add('Cable Bicep Curl', 'Isolation', ['biceps'], ['forearms'], ['cable'], 'Beginner', 'curl', 'A cable-based biceps exercise that provides resistance throughout the movement.', 'Keep your elbows stationary and curl smoothly.'),
  add('Triceps Pushdown', 'Isolation', ['triceps'], [], ['cable'], 'Beginner', 'triceps', 'A cable isolation exercise that trains elbow extension and targets the triceps.', 'Keep your elbows close to your torso.'),
  add('Skull Crusher', 'Isolation', ['triceps'], [], ['ez bar', 'bench'], 'Intermediate', 'triceps', 'A lying triceps extension that trains the triceps through elbow extension.', 'Keep your upper arms steady and lower the weight under control.'),
  add('Overhead Triceps Extension', 'Isolation', ['triceps'], [], ['cable'], 'Intermediate', 'triceps', 'An overhead cable extension that trains the triceps through elbow extension.', 'Keep your upper arms stable and use a comfortable range of motion.'),
  add('Dumbbell Lateral Raise', 'Isolation', ['side delts'], [], ['dumbbells'], 'Beginner', 'lateral-raise', 'A shoulder isolation exercise that emphasizes the lateral deltoids.', 'Raise your arms outward with a slight bend in your elbows.'),
  add('Reverse Dumbbell Fly', 'Isolation', ['rear delts'], ['upper back'], ['dumbbells'], 'Beginner', 'fly', 'A rear-delt isolation exercise performed with a bent-over position.', 'Raise the dumbbells outward without shrugging your shoulders.'),
  add('Leg Extension', 'Isolation', ['quads'], [], ['machine'], 'Beginner', 'leg-extension', 'A machine isolation exercise that targets the quadriceps through knee extension.', 'Extend your knees smoothly and avoid swinging the weight.'),
  add('Leg Curl', 'Isolation', ['hamstrings'], [], ['machine'], 'Beginner', 'leg-curl', 'A machine isolation exercise that targets the hamstrings through knee flexion.', 'Keep your hips supported and curl the weight under control.')
]

// Seed database
async function seedExercises() {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error('MONGO_URI is missing from .env')
    }

    await mongoose.connect(process.env.MONGO_URI)
    console.log('Connected to MongoDB Atlas')

    const operations = exercises.map(exercise => ({
      updateOne: {
        filter: { identifier: exercise.identifier },
        update: { $set: exercise },
        upsert: true
      }
    }))

    const result = await Exercise.bulkWrite(operations)

    console.log(`Seed complete: ${exercises.length} exercises processed`)
    console.log(`Inserted: ${result.upsertedCount}`)
    console.log(`Updated: ${result.modifiedCount}`)
    console.log(`Total exercises in database: ${await Exercise.countDocuments()}`)

  } catch (error) {
    console.error('Seed failed:', error)
    process.exitCode = 1
  } finally {
    await mongoose.disconnect()
  }
}

seedExercises()
